"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { TextReveal } from "@/components/ui/TextReveal";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

const CATEGORIES = [
  { name: "Necklaces", image: "/images/categories/necklaces.png" },
  { name: "Earrings", image: "/images/categories/earrings.png" },
  { name: "Bangles", image: "/images/categories/bangles.png" },
  { name: "Brooches", image: "/images/categories/brooches.png" },
  { name: "Rings", image: "/images/categories/rings.png" },
  { name: "Bridal Necklaces", image: "/images/categories/bridal.png" },
];

export function Categories() {
  const [active, setActive] = useState(0);

  return (
    <section className="bg-ink px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col items-start justify-between gap-6 border-b border-gold/15 pb-10 md:flex-row md:items-end">
          <h2 className="font-display text-4xl leading-tight text-bone md:text-5xl">
            <TextReveal>Six categories.</TextReveal>
            <TextReveal delay={0.08} className="italic text-gold">
              One standard.
            </TextReveal>
          </h2>
          <Reveal>
            <p className="max-w-sm text-sm leading-relaxed text-bone/60">
              Every category is manufactured in-house — from CAD design to the
              final polish — so quality never depends on a third party.
            </p>
          </Reveal>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2 md:gap-16">
          <ul
            onMouseLeave={() => setActive(0)}
            className="flex flex-col divide-y divide-gold/10"
          >
            {CATEGORIES.map((cat, i) => (
              <li key={cat.name}>
                <a
                  href="#collection"
                  data-cursor="View"
                  onMouseEnter={() => setActive(i)}
                  className="group flex items-center justify-between gap-6 py-6"
                >
                  <span className="flex items-baseline gap-6">
                    <span className="font-display text-xs text-gold">
                      0{i + 1}
                    </span>
                    <span
                      className={cn(
                        "font-display text-3xl transition-colors duration-300 md:text-4xl",
                        active === i ? "text-gold" : "text-bone group-hover:text-gold/70"
                      )}
                    >
                      {cat.name}
                    </span>
                  </span>
                  <ArrowUpRight
                    size={22}
                    className={cn(
                      "shrink-0 text-gold transition-all duration-300",
                      active === i
                        ? "translate-x-0 opacity-100"
                        : "-translate-x-2 opacity-0"
                    )}
                  />
                </a>
              </li>
            ))}
          </ul>

          <div className="relative hidden aspect-[4/5] overflow-hidden rounded-sm md:block">
            <AnimatePresence mode="wait">
              <motion.div
                key={CATEGORIES[active].name}
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="absolute inset-0"
              >
                <Image
                  src={CATEGORIES[active].image}
                  alt={CATEGORIES[active].name}
                  fill
                  sizes="45vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 border border-gold/20" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-8 flex gap-4 overflow-x-auto pb-2 md:hidden">
          {CATEGORIES.map((cat) => (
            <a
              key={cat.name}
              href="#collection"
              className="relative aspect-square w-32 shrink-0 overflow-hidden rounded-sm"
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                sizes="128px"
                className="object-cover"
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent px-2 pb-2 pt-6 text-center text-[10px] uppercase tracking-wide text-bone">
                {cat.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
