"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowDown } from "lucide-react";

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col justify-end overflow-hidden bg-ink px-6 pb-14 pt-32 md:px-12 md:pb-16">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/products/test.jpg"
          alt="Handcrafted Polki and diamond necklace by Maa Satti Jewels"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[80%_25%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink from-10% via-ink/85 via-45% to-ink/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink from-0% via-ink/35 via-55% to-transparent" />
      </div>

      <div className="relative mx-auto w-full max-w-[1400px]">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-5 flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-gold"
        >
          <span className="h-px w-8 bg-gold" />
          Jaipur, India &middot; Est. 2003
        </motion.p>

        <h1 className="font-display text-[12.5vw] leading-[0.95] tracking-tight text-bone md:text-[6.8vw]">
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
