import Image from "next/image";
import { TextReveal } from "@/components/ui/TextReveal";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { Reveal } from "@/components/ui/Reveal";
import { SectionCanvas } from "@/components/core/ReactiveBackground";
import { BG } from "@/components/core/bgModes";

const AWARDS = [
  {
    year: "2025",
    title: "Polki Necklace of the Year",
    body: "The 2025 Jewellery Eminence Awards honored a design that transcends traditional boundaries, shifting from structural rigidity toward “Fluid Heritage.”",
    image: "/images/awards/award3.jpg",
  },
  {
    year: "2024",
    title: "JEA Polki Bangle / Bracelet",
    body: "Honored for a Polki bangle that defines a new era of “Architectural Heritage,” shifting from regal silhouettes toward a fluid, structural form.",
    image: "/images/awards/award2.jpg",
  },
  {
    year: "2023",
    title: "Polki Bangle / Bracelet of the Year",
    body: "Secured at the Jewellery Eminence Awards for a design epitomizing “modern heritage” and “silent luxury.”",
    image: "/images/awards/award1.jpg",
  },
];

export function Awards() {
  return (
    <section className="relative isolate bg-bone px-6 py-24 text-ink md:px-12 md:py-32">
      <SectionCanvas mode={BG.awards} />
      <div className="relative z-10 mx-auto max-w-[1400px]">
        <div className="flex flex-col items-start justify-between gap-6 border-b border-ink/10 pb-10 md:flex-row md:items-end">
          <h2 className="font-display text-4xl leading-tight md:text-5xl">
            <TextReveal>Recognized by the</TextReveal>
            <TextReveal delay={0.06} className="italic text-gold-deep">
              industry, three years running.
            </TextReveal>
          </h2>
          <Reveal>
            <p className="max-w-sm text-sm leading-relaxed text-ink/60">
              Honored by the Madras Jewellers &amp; Diamond Merchants
              Association in 2018, and by the Jewellery Eminence Awards every
              year since 2023.
            </p>
          </Reveal>
        </div>

        <div className="mt-20 grid gap-20 md:grid-cols-3 md:gap-10">
          {AWARDS.map((award, i) => (
            <Reveal key={award.year} delay={i * 0.08}>
              <div className="relative">
                <span className="pointer-events-none absolute -top-16 left-0 select-none font-display text-[6rem] leading-none text-ink/[0.06] md:-top-20 md:text-[7.5rem]">
                  {award.year}
                </span>
                <ImageReveal delay={i * 0.08} curtain="bone" className="relative aspect-[4/3] w-full rounded-sm">
                  <Image
                    src={award.image}
                    alt={`${award.title} — Jewellery Eminence Awards ${award.year}`}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover"
                  />
                </ImageReveal>
                <p className="relative mt-5 font-display text-sm text-gold-deep">{award.year}</p>
                <h3 className="relative mt-1 font-display text-xl">{award.title}</h3>
                <p className="relative mt-2 text-sm leading-relaxed text-ink/60">{award.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
