import type { Metadata } from "next";
import { Inter, Instrument_Sans, Geist } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-inter",
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-instrument-sans",
});

const geist = Geist({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-geist",
});

export const metadata: Metadata = {
  title: "Sriyaan — Portfolio",
  description: "Building systems that scale",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrumentSans.variable} ${geist.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
