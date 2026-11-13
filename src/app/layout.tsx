import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = { title: "Sriyaan — AI Systems Engineer", description: "Digital products, built to reason." };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
