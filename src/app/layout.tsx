import type { Metadata } from "next";
import { Playfair_Display, Lato, Great_Vibes } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-heading",
});

const greatVibes = Great_Vibes({
  weight: ['400'],
  subsets: ["latin"],
  variable: "--font-accent",
});

const lato = Lato({ 
  weight: ['300', '400', '700'],
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "eWeddingz | Bespoke Wedding Websites, Invites & Reels · eweddingz.online",
  description: "Next-gen bespoke digital wedding websites, 9:16 cinematic reels, and luxury digital invitations hosted on eweddingz.online. Tailored for Hindu Vivah, Muslim Nikah, Catholic Nuptials, and all traditions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${lato.variable} ${greatVibes.variable}`}>
        {children}
      </body>
    </html>
  );
}
