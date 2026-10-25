import type { Metadata, Viewport } from "next";
import { Anek_Latin, Anek_Devanagari } from "next/font/google";
import "./globals.css";

const latin = Anek_Latin({
  variable: "--font-latin",
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
  display: "swap",
});

const deva = Anek_Devanagari({
  variable: "--font-deva",
  subsets: ["devanagari"],
  axes: ["wdth"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Arun Bharti · MP, Jamui",
  description:
    "Arun Bharti, Member of Parliament for Jamui, Bihar, and Chief Whip of the Lok Janshakti Party (Ram Vilas). Execution over intent.",
};

export const viewport: Viewport = { themeColor: "#F5F3EE" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${latin.variable} ${deva.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
