"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowDown } from "lucide-react";

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col justify-end overflow-hidden bg-ink px-6 pb-16 pt-40 md:px-12">
      <div className="absolute inset-0 -z-20">
        <Image
          src="https://images.unsplash.com/photo-1611652022419-a9419f74343d?q=80&w=2400&auto=format&fit=crop"
          alt="Handcrafted gold Polki jewellery"
          fill
          priority
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-transparent to-ink/60" />
      </div>

      <div className="relative mx-auto w-full max-w-[1600px]">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-gold"
        >
          <span className="h-px w-8 bg-gold" />
          Jaipur, India · Est. 2003
        </motion.p>

        <h1 className="font-display text-[13vw] leading-[0.92] tracking-tight text-bone md:text-[7.5vw]">
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="block"
          >
            The atelier
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="block italic text-gold"
          >
            behind India&apos;s
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="block"
          >
            finest jewellers.
          </motion.span>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-10 flex flex-col items-start justify-between gap-8 border-t border-gold/20 pt-8 md:flex-row md:items-end"
        >
          <p className="max-w-md text-base leading-relaxed text-bone/70">
            350 master craftsmen. 9,800+ pieces a year. Real gold, certified
            diamonds, and Polki heritage — manufactured for the retailers and
            brands you already trust.
          </p>

          <div className="flex items-center gap-6">
            <a
              href="#contact"
              className="rounded-full bg-gold px-8 py-4 text-xs uppercase tracking-[0.2em] text-ink transition hover:bg-gold-light"
            >
              Book a Sourcing Call
            </a>
            <a
              href="#heritage"
              className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-bone/60 transition hover:text-gold"
            >
              Scroll <ArrowDown size={14} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
