import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";

const sans = Manrope({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const serif = Cormorant_Garamond({ subsets: ["latin"], variable: "--font-serif", display: "swap", weight: ["400", "500", "600"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://northforgeweb.netlify.app"),
  title: "NorthForge — Websites with gravity",
  description: "Custom web design for restaurants, hospitality brands, and local businesses in Ontario and beyond.",
  openGraph: {
    title: "NorthForge — Websites with gravity",
    description: "Premium, mobile-first websites built to make the right impression before the first visit.",
    type: "website",
  },
};

export const viewport: Viewport = { themeColor: "#080806", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
