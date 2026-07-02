"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { TextReveal } from "@/components/ui/TextReveal";
import { ImageReveal } from "@/components/ui/ImageReveal";

const TEAM = [
  {
    name: "Narendra Singh",
    role: "Director",
    image: "/images/team/narendra.png",
    bio: "A visionary leader focused on design excellence and market growth, driving the brand's creative and strategic direction.",
  },
  {
    name: "Damodar Singh",
    role: "Director",
    image: "/images/team/damodar.png",
    bio: "Deep expertise in manufacturing and operations, ensuring uncompromising quality at every stage of production.",
  },
  {
    name: "Lal Singh",
    role: "Director",
    image: "/images/team/lal.png",
    bio: "Rooted in tradition and values — strengthening relationships and upholding ethical business practices across the trade.",
  },
];

export function Team() {
  return (
    <section id="team" className="bg-ink px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="border-b border-gold/15 pb-10">
          <p className="text-xs uppercase tracking-[0.35em] text-gold">
            <TextReveal>Leadership</TextReveal>
          </p>
          <h2 className="mt-5 max-w-xl font-display text-4xl leading-tight text-bone md:text-5xl">
            <TextReveal delay={0.06}>The hands steering the atelier.</TextReveal>
          </h2>
        </div>

        <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          {TEAM.map((member, i) => (
            <div key={member.name} className="group">
              <ImageReveal delay={i * 0.08} className="aspect-[4/5] w-full rounded-sm">
                <motion.div
                  initial={{ filter: "grayscale(1)" }}
                  whileInView={{ filter: "grayscale(0)" }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1.4, delay: 0.35 + i * 0.08 }}
                  className="relative h-full w-full"
                >
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </motion.div>
              </ImageReveal>
              <p className="relative mt-5 inline-block font-display text-2xl text-bone">
                {member.name}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-500 group-hover:w-full" />
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-gold">{member.role}</p>
              <p className="mt-3 text-sm leading-relaxed text-bone/60">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
