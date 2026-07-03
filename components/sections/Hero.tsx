"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { TextReveal } from "@/components/ui/TextReveal";
import { Magnetic } from "@/components/ui/Magnetic";
import { SparkleField } from "@/components/ui/SparkleField";
import { useReady } from "@/components/core/ReadyContext";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const { ready } = useReady();
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "25%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], reduced ? [1, 1] : [1.08, 1.22]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], reduced ? [1, 1] : [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "20%"]);

  return (
    <section
      ref={sectionRef}
      className="relative isolate flex min-h-screen flex-col justify-end overflow-hidden bg-porcelain px-6 pb-14 pt-32 md:px-12 md:pb-16"
    >
      <motion.div style={{ y: imageY }} className="absolute inset-0 -z-10">
        <motion.div style={{ scale: imageScale }} className="absolute inset-0">
          <Image
            src="/images/products/test.jpg"
            alt="Handcrafted Polki and diamond necklace by Maa Satti Jewels"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[80%_25%]"
          />
        </motion.div>
        {/* A solid cream column on the left carries the headline (dark text); the portrait
            occupies the right. A softer cream wash along the bottom seats the button row.
            Explicit gradients (not utilities) so opacity over the warm photo is exact. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(250,246,239,1) 0%, rgba(250,246,239,0.99) 40%, rgba(250,246,239,0.6) 58%, rgba(250,246,239,0) 78%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(250,246,239,0.96) 0%, rgba(250,246,239,0.55) 24%, rgba(250,246,239,0) 55%)",
          }}
        />
      </motion.div>

      <SparkleField className="opacity-80" />

      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative mx-auto w-full max-w-[1400px]"
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-5 flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-gold-deep"
        >
          <span className="h-px w-8 bg-gold-deep" />
          Jaipur, India &middot; Est. 2003
        </motion.p>

        <h1 className="font-display text-[12.5vw] leading-[0.95] tracking-tight text-ink md:text-[6.8vw]">
          <TextReveal show={ready} delay={0.65} duration={1}>
            The atelier
          </TextReveal>
          <TextReveal show={ready} delay={0.78} duration={1} className="italic text-gold-deep">
            behind India&apos;s
          </TextReveal>
          <TextReveal show={ready} delay={0.91} duration={1}>
            finest jewellers.
          </TextReveal>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.15 }}
          className="mt-10 flex flex-col items-start justify-between gap-8 border-t border-ink/15 pt-8 md:flex-row md:items-end"
        >
          <p className="max-w-md text-base leading-relaxed text-ink/70">
            350 master craftsmen. 9,800+ pieces a year. Real gold, certified
            diamonds, and Polki heritage — manufactured for the retailers and
            brands you already trust.
          </p>

          <div className="flex items-center gap-6">
            <Magnetic>
              <a
                href="#contact"
                data-cursor="Let's talk"
                className="block rounded-full bg-ink px-8 py-4 text-xs uppercase tracking-[0.2em] text-porcelain transition hover:bg-gold-deep"
              >
                Book a Sourcing Call
              </a>
            </Magnetic>
            <a
              href="#heritage"
              className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-ink/60 transition hover:text-gold-deep"
            >
              Scroll
              <motion.span
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: EASE }}
              >
                <ArrowDown size={14} />
              </motion.span>
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
