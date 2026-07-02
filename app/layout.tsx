import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT", "WONK"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Maa Satti Jewels — The Atelier Behind India's Finest Jewellers",
  description:
    "Since 2003, Maa Satti Jewels has been Jaipur's B2B home of light-weight luxury — 350+ master craftsmen hand-forging Polki, diamond, and 22K gold jewellery for retailers and brands worldwide.",
  metadataBase: new URL("https://maasattijewels.vercel.app"),
  openGraph: {
    title: "Maa Satti Jewels — The Atelier Behind India's Finest Jewellers",
    description:
      "350+ master craftsmen. 9,800+ pieces a year. Real gold, certified diamonds, Polki heritage — handcrafted in Jaipur since 2003.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="bg-ink text-bone antialiased">{children}</body>
    </html>
  );
}
