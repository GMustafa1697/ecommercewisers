import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/sections/Footer";
import { Header } from "@/components/sections/Header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Not preloaded: it only sets the Process list's step numbers (shown from 640 to 1279px), so it loads
// where it's used instead of on every visit.
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  preload: false,
});

export const metadata: Metadata = {
  title: "ecommercewisers — E-commerce Development Agency",
  description:
    "ecommercewisers builds fast, reliable online stores: Shopify, WordPress and Next.js development, plus Figma to Web, for e-commerce businesses and startups.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
