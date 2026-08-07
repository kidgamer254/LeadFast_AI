import { GoogleGenAI } from "@google/genai";
import Anthropic from "@anthropic-ai/sdk";
import { Resend } from "resend";
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Read request body
    const body = await request.json();
    const { name, email, phone, message, business_id, businessId } = body;
    const targetBusinessId = business_id || businessId || null;

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

    // Save lead into Supabase if configured
    let leadData = null;
    if (supabase) {
      const { data, error: leadError } = await supabase
        .from("leads")
        .insert([
          {
            business_id: targetBusinessId,
            lead_name: name,
            lead_email: email,
            lead_phone: phone || null,
            message: message,
            status: "received",
          },
        ])
        .select();

      if (leadError) {
        console.error("Failed to insert lead into Supabase:", leadError);
        return NextResponse.json(
          {
            success: false,
            message: "Failed to save lead.",
            error: leadError.message,
          },
          { status: 500 }
        );
      }
      leadData = data;
    }

    console.log("Lead successfully inserted:", leadData);

    let aiReply = "";

<<<<<<< HEAD
    // Try Gemini first
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash-lite",
        contents: `
You are an AI assistant for LeadFast AI.
=======
    // 1. Try Gemini AI if GEMINI_API_KEY is present
    if (process.env.GEMINI_API_KEY) {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: `
You are writing a fast, friendly, and professional email response on behalf of LeadFast AI service team.
>>>>>>> 4afe64c2a40fb2a1a53a12c548db29b7c9b5a9c0

A customer named ${name} submitted this message:
"${message}"

Write a warm, concise, and professional reply thanking them for reaching out, acknowledging their specific request, and letting them know a team member will follow up with them shortly. Do NOT mention that you are an AI, bot, assistant, or automated system. Write naturally as a real team representative.
          `,
        });
        aiReply = response.text || "";
        console.log("Gemini AI generated reply successfully.");
      } catch (geminiError) {
        console.error("Gemini AI generation warning:", geminiError);
      }
    }

    // 2. Try Anthropic Claude if Gemini didn't run or failed
    if (!aiReply && process.env.ANTHROPIC_API_KEY) {
      try {
        const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
        const response = await anthropic.messages.create({
          model: "claude-3-haiku-20240307",
          max_tokens: 300,
          messages: [
            {
              role: "user",
              content: `
You are writing a fast, friendly, and professional email response on behalf of LeadFast AI service team.

A customer named ${name} submitted this message:
"${message}"

Write a warm, concise, and professional reply thanking them for reaching out, acknowledging their specific request, and letting them know a team member will follow up with them shortly. Do NOT mention that you are an AI, bot, assistant, or automated system. Write naturally as a real team representative.
              `,
            },
          ],
        });

        aiReply = response.content
          .filter((block: any) => block.type === "text")
          .map((block: any) => block.text)
          .join("\n");

        console.log("Claude generated reply successfully.");
      } catch (claudeError) {
        console.error("Claude AI generation warning:", claudeError);
      }
    }

    // 3. Fallback reply if AI services are unavailable
    if (!aiReply) {
      aiReply = `Hello ${name},

Thank you for contacting LeadFast AI.

We have received your message:
"${message}"

Our team is reviewing your request and will get back to you shortly.

Kind regards,
LeadFast AI Team`;
    }

    // Send confirmation email via Resend if RESEND_API_KEY is present
    if (process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const { error } = await resend.emails.send({
          from: "LeadFast <onboarding@resend.dev>",
          to: email,
          subject: "Thank you for contacting LeadFast AI",
          text: aiReply,
        });

        if (error) {
          console.error("Resend Email Warning (Sandbox restriction):", error.message || error);
        } else {
          console.log("Email sent successfully.");
        }
      } catch (resendErr) {
        console.error("Resend sending error caught gracefully:", resendErr);
      }
    }

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