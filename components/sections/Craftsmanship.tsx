"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll } from "framer-motion";
import { TextReveal } from "@/components/ui/TextReveal";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { Reveal } from "@/components/ui/Reveal";
import { SectionCanvas } from "@/components/core/ReactiveBackground";
import { BG } from "@/components/core/bgModes";

const STEPS = [
  {
    n: "01",
    title: "Design & CAD",
    copy: "Every piece begins as a hand sketch, refined into precision CAD before a single gram of gold is cut.",
  },
  {
    n: "02",
    title: "Stone Selection",
    copy: "Polki, certified diamonds, and natural gemstones are hand-selected for brilliance, clarity, and durability.",
  },
  {
    n: "03",
    title: "Hand-Setting",
    copy: "Master setters place each stone by hand under microscope-grade precision — a skill passed through generations.",
  },
  {
    n: "04",
    title: "Polish & Quality Check",
    copy: "Every piece passes a strict multi-point check for finish, stone security, and gold purity before dispatch.",
  },
];

const GALLERY = [
  { src: "/images/production/p4.jpg", alt: "350+ craftsmen at work on the Maa Satti Jewels manufacturing floor" },
  { src: "/images/production/p5.jpg", alt: "Hand-setting Polki stones onto a lac base" },
  { src: "/images/production/p2.jpg", alt: "A craftsman hand-setting an emerald" },
  { src: "/images/production/p3.jpg", alt: "Macro detail of a finished Polki ring" },
];

export function Craftsmanship() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 0.75", "end 0.4"],
  });

  return (
    <section id="craft" className="relative isolate bg-bone px-6 py-24 text-ink md:px-12 md:py-32">
      <SectionCanvas mode={BG.craftsmanship} />
      <div className="relative z-10 mx-auto max-w-[1400px]">
        <p className="text-xs uppercase tracking-[0.35em] text-gold-deep">
          <TextReveal>Outstanding Production Ability</TextReveal>
        </p>
        <h2 className="mt-5 max-w-2xl font-display text-4xl leading-tight md:text-5xl">
          <TextReveal delay={0.06}>From molten gold to</TextReveal>
          <TextReveal delay={0.12}>museum-grade finish.</TextReveal>
        </h2>

        <div ref={timelineRef} className="relative mt-16 md:pl-4">
          <div className="absolute left-0 top-0 h-full w-px bg-ink/10 md:left-4" />
          <motion.div
            style={{ scaleY: scrollYProgress }}
            className="absolute left-0 top-0 h-full w-px origin-top bg-gold-deep md:left-4"
          />

          {STEPS.map((step, i) => (
            <Reveal key={step.n} delay={i * 0.05}>
              <div className="relative flex gap-6 border-b border-ink/10 py-8 pl-8 last:border-b-0 md:pl-14">
                <span className="absolute left-0 top-8 h-2 w-2 -translate-x-[3.5px] rounded-full bg-gold-deep md:left-4" />
                <span className="font-display text-sm text-gold-deep">{step.n}</span>
                <div>
                  <h3 className="font-display text-xl md:text-2xl">{step.title}</h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-ink/60">
                    {step.copy}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 -mx-6 flex gap-4 overflow-x-auto px-6 pb-4 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-4 md:gap-5 md:overflow-visible md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden">
          {GALLERY.map((img, i) => (
            <ImageReveal
              key={img.src}
              delay={i * 0.06}
              curtain="bone"
              className="aspect-[3/4] w-[70vw] shrink-0 rounded-sm sm:w-[45vw] md:aspect-[4/5] md:w-auto"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 768px) 25vw, 70vw"
                className="object-cover"
              />
            </ImageReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
