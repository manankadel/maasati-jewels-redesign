"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";

const CATEGORIES = [
  { name: "Necklaces", image: "/images/categories/necklaces.png" },
  { name: "Earrings", image: "/images/categories/earrings.png" },
  { name: "Bangles", image: "/images/categories/bangles.png" },
  { name: "Brooches", image: "/images/categories/brooches.png" },
  { name: "Rings", image: "/images/categories/rings.png" },
  { name: "Bridal Necklaces", image: "/images/categories/bridal.png" },
];

export function Categories() {
  return (
    <section className="bg-ink px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 border-b border-gold/15 pb-10 md:flex-row md:items-end">
            <h2 className="font-display text-4xl leading-tight text-bone md:text-5xl">
              Six categories.
              <br />
              <span className="italic text-gold">One standard.</span>
            </h2>
            <p className="max-w-sm text-sm leading-relaxed text-bone/60">
              Every category is manufactured in-house — from CAD design to the
              final polish — so quality never depends on a third party.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5">
          {CATEGORIES.map((cat, i) => (
            <Reveal key={cat.name} delay={i * 0.05}>
              <motion.a
                href={`#collection`}
                whileHover="hover"
                className="group relative flex aspect-square flex-col items-center justify-center gap-5 overflow-hidden rounded-sm border border-gold/15 bg-ink-soft px-6 py-8 transition-colors hover:border-gold/40"
              >
                <motion.div
                  variants={{ hover: { scale: 1.08, y: -4 } }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border border-gold/25 bg-ink md:h-28 md:w-28"
                >
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                </motion.div>
                <span className="text-center font-display text-base text-bone md:text-lg">
                  {cat.name}
                </span>
                <motion.span
                  variants={{ hover: { opacity: 1, y: 0 } }}
                  initial={{ opacity: 0, y: 4 }}
                  className="absolute bottom-4 right-4 font-display text-gold"
                >
                  ↗
                </motion.span>
              </motion.a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
