import { GoogleGenAI } from "@google/genai";
import { Resend } from "resend";
import { supabase } from "../../../lib/supabase";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

// Initialize the Google Gen AI SDK (it automatically picks up process.env.GEMINI_API_KEY)
const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});

export async function POST(request: Request) {
  try {
    // Check environment variables
    if (!process.env.RESEND_API_KEY) {
      throw new Error("Missing RESEND_API_KEY in .env.local");
    }

    if (!process.env.GEMINI_API_KEY) {
      throw new Error("Missing GEMINI_API_KEY in .env.local");
    }

    // Read request body
    const body = await request.json();

    const { name, email, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "Name, email and message are required.",
        },
        { status: 400 }
      );
    }

    // Save lead into Supabase 
    console.log("using supabase url:",process.env.NEXT_PUBLIC_SUPABASE_URL ? "LOADED" : "MISSING");
    console.log("using Service role key url:",process.env.SUPABASE_SERVICE_ROLE_KEY ? "LOADED" : "MISSING");
    

    const { data: leadData, error: leadError } = await supabase
      .from("leads")
      .insert([
        {
          lead_name: name,
          lead_email: email,
          message: message,
          status: "received",
        },
      ])
      .select();

    if (leadError) {
      console.error("Failed to insert lead:", leadError);

      return NextResponse.json(
        {
          success: false,
          message: "Failed to save lead.",
          error: leadError.message,
        },
        { status: 500 }
      );
    }

    console.log("Lead inserted:", leadData);

    console.log("========== NEW LEAD ==========");
    console.log(body);

    let aiReply = "";

    // Try Gemini first
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: `
You are an AI assistant for LeadFast AI.

A customer named ${name} submitted this message:

"${message}"

Write a friendly and professional email thanking them,
acknowledging their request,
and letting them know someone will contact them shortly.
        `,
      });

      aiReply = response.text || "";

      console.log("Gemini generated a reply successfully.");

    } catch (geminiError) {
      console.error("Gemini failed.");
      console.error(geminiError);

      // Fallback reply
      aiReply = `Hello ${name},

Thank you for contacting LeadFast AI.

We have received your message:

"${message}"

Our team will review your request and get back to you shortly.

Kind regards,

LeadFast AI Team`;
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "LeadFast <onboarding@resend.dev>",
      to: email,
      subject: "Thank you for contacting LeadFast AI",
      text: aiReply,
    });

    if (error) {
      console.error("Resend Error:");
      console.error(error);

      return NextResponse.json(
        {
          success: false,
          message: "Failed to send email.",
          error,
        },
        { status: 500 }
      );
    }

    console.log("Email sent successfully.");

    return NextResponse.json({
      success: true,
      message: "Lead processed successfully.",
      aiReply,
    });

  } catch (error) {
    console.error("========== SERVER ERROR ==========");
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Server error occurred.",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}