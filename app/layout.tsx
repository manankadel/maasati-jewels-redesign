import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/core/SmoothScroll";
import { Cursor } from "@/components/core/Cursor";
import { Grain } from "@/components/core/Grain";
import { Preloader } from "@/components/core/Preloader";
import { ReadyProvider } from "@/components/core/ReadyContext";

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
  alternates: { canonical: "/" },
  keywords: [
    "Polki jewellery manufacturer",
    "B2B jewellery Jaipur",
    "Kundan jewellery wholesale",
    "diamond jewellery manufacturer India",
    "22K gold jewellery",
    "Maa Satti Jewels",
  ],
  openGraph: {
    title: "Maa Satti Jewels — The Atelier Behind India's Finest Jewellers",
    description:
      "350+ master craftsmen. 9,800+ pieces a year. Real gold, certified diamonds, Polki heritage — handcrafted in Jaipur since 2003.",
    type: "website",
    url: "/",
    siteName: "Maa Satti Jewels",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Maa Satti Jewels — The Atelier Behind India's Finest Jewellers",
    description:
      "350+ master craftsmen. 9,800+ pieces a year. Handcrafted in Jaipur since 2003.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#faf6ef",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="bg-porcelain text-ink antialiased">
        <ReadyProvider>
          <Preloader />
          <Grain />
          <Cursor />
          <SmoothScroll>{children}</SmoothScroll>
        </ReadyProvider>
      </body>
    </html>
  );
}
