"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";

const CATEGORIES = [
  {
    name: "Necklaces",
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Earrings",
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Bangles",
    image:
      "https://images.unsplash.com/photo-1602751584547-6d181cdb6d5b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Brooches",
    image:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Rings",
    image:
      "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Bridal Sets",
    image:
      "https://images.unsplash.com/photo-1622398925373-3f91b1e275f5?q=80&w=1200&auto=format&fit=crop",
  },
];

export function Categories() {
  return (
    <section className="bg-ink px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto max-w-[1600px]">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <h2 className="font-display text-4xl leading-tight text-bone md:text-6xl">
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

        <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
          {CATEGORIES.map((cat, i) => (
            <Reveal key={cat.name} delay={i * 0.06}>
              <motion.div
                whileHover="hover"
                className="group relative aspect-[3/4] cursor-pointer overflow-hidden rounded-sm border border-gold/15"
              >
                <motion.div
                  variants={{ hover: { scale: 1.08 } }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-5">
                  <span className="font-display text-lg text-bone md:text-xl">
                    {cat.name}
                  </span>
                  <motion.span
                    variants={{ hover: { x: 4, y: -4, opacity: 1 } }}
                    initial={{ opacity: 0.6 }}
                    className="font-display text-lg text-gold"
                  >
                    ↗
                  </motion.span>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
