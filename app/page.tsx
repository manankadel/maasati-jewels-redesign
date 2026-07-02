import { Nav } from "@/components/core/Nav";
import { Footer } from "@/components/core/Footer";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/ui/Marquee";
import { Heritage } from "@/components/sections/Heritage";
import { Categories } from "@/components/sections/Categories";
import { Craftsmanship } from "@/components/sections/Craftsmanship";
import { Collection } from "@/components/sections/Collection";
import { TrustBar } from "@/components/sections/TrustBar";
import { Team } from "@/components/sections/Team";
import { Awards } from "@/components/sections/Awards";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { CTASection } from "@/components/sections/CTASection";

const TICKER = [
  "POLKI",
  "CERTIFIED DIAMONDS",
  "22K GOLD",
  "HANDCRAFTED IN JAIPUR",
  "KUNDAN WORK",
  "SINCE 2003",
];

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex flex-col">
        <Hero />
        <Marquee items={TICKER} />
        <Heritage />
        <Categories />
        <Craftsmanship />
        <TrustBar />
        <Collection />
        <Team />
        <Awards />
        <FAQAccordion />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
