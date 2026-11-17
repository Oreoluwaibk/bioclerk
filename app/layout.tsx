import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from "@/components/google-analytics";
import { MicrosoftStoreScript } from "@/components/microsoft-store-script";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "BioClerk — Offline clinical dictation",
    template: "%s · BioClerk",
  },
  description:
    "BioClerk turns clinical speech into text entirely on your device. Private by design — dictation never leaves your device unless you opt in. Available on Windows, Android, and as a web extension.",
  icons: {
    icon: "/brand/logo.svg",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <GoogleAnalytics />
        <MicrosoftStoreScript />
        {children}
      </body>
    </html>
  );
}
