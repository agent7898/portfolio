import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display, Space_Grotesk } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/layout/AppShell";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "GC Likith Chowdary — Software Engineer",
  description:
    "Portfolio of GC Likith Chowdary — software engineer and Computer Science Engineering student working across software development and machine learning.",
  openGraph: {
    title: "GC Likith Chowdary — Software Engineer",
    description:
      "Software engineer working across software development and machine learning.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${spaceGrotesk.variable} ${playfair.variable}`}
    >
      <body className="bg-black font-sans text-white antialiased">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
