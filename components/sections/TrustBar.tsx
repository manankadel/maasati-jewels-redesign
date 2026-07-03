import { Reveal } from "@/components/ui/Reveal";

const POINTS = [
  { value: "22K", label: "Real gold, 14K–22K purity" },
  { value: "100%", label: "Certified diamonds, every stone" },
  { value: "Global", label: "Pan-India + international supply" },
  { value: "350+", label: "In-house master craftsmen" },
];

export function TrustBar() {
  return (
    <section className="border-y border-ink/10 bg-bone px-6 py-14 md:px-12">
      <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-y-10 md:grid-cols-4 md:gap-0">
        {POINTS.map((point, i) => (
          <Reveal key={point.label} delay={i * 0.06}>
            <div className="relative pr-6 md:border-l md:border-ink/10 md:px-8 md:first:border-l-0 md:first:pl-0">
              <p className="font-display text-3xl text-gold-deep md:text-4xl">{point.value}</p>
              <p className="mt-2 max-w-[18ch] text-xs uppercase leading-snug tracking-[0.12em] text-ink/50">
                {point.label}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
