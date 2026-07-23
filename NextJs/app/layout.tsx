import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LeadFast AI | HVAP Contractor Portal",
  description: "AI-powered lead management and contractor portal for HVAP businesses.",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
