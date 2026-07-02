import { Gem, ShieldCheck, Globe2, Hammer } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const POINTS = [
  { icon: Gem, label: "Real Gold, 14K–22K" },
  { icon: ShieldCheck, label: "Certified Diamonds" },
  { icon: Globe2, label: "Pan-India + International" },
  { icon: Hammer, label: "350+ In-House Craftsmen" },
];

export function TrustBar() {
  return (
    <section className="border-y border-gold/15 bg-ink-soft px-6 py-14 md:px-12">
      <div className="mx-auto grid max-w-[1600px] grid-cols-2 gap-8 md:grid-cols-4 md:gap-6">
        {POINTS.map((point, i) => (
          <Reveal key={point.label} delay={i * 0.06}>
            <div className="flex flex-col items-center gap-3 text-center md:flex-row md:text-left">
              <point.icon className="text-gold" size={26} strokeWidth={1.4} />
              <p className="text-xs uppercase tracking-[0.15em] text-bone/70">
                {point.label}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
