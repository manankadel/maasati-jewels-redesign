import { TextReveal } from "@/components/ui/TextReveal";
import { Reveal } from "@/components/ui/Reveal";
import { Magnetic } from "@/components/ui/Magnetic";
import { SparkleField } from "@/components/ui/SparkleField";
import { FacetGem } from "@/components/ui/FacetGem";
import { ArrowUpRight } from "lucide-react";

const WORDS = Array(6).fill("BESPOKE SOURCING");

export function CTASection() {
  return (
    <section className="relative overflow-hidden bg-ink py-24 md:py-36">
      <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none whitespace-nowrap opacity-[0.05]">
        <div className="flex animate-marquee gap-10">
          {[...WORDS, ...WORDS].map((w, i) => (
            <span key={i} className="font-display text-[10vw] leading-none text-gold">
              {w}
            </span>
          ))}
        </div>
      </div>

      <SparkleField className="opacity-60" />

      <div className="relative mx-auto max-w-4xl px-6 text-center md:px-12">
        <FacetGem className="mx-auto mb-8 h-24 w-28 md:h-28 md:w-32" />
        <p className="text-xs uppercase tracking-[0.35em] text-gold">
          <TextReveal className="justify-center">Let&apos;s Build Something Timeless</TextReveal>
        </p>
        <h2 className="mt-6 font-display text-5xl leading-[1.05] text-bone md:text-7xl">
          <TextReveal delay={0.06} className="justify-center">
            Begin a bespoke
          </TextReveal>
          <TextReveal delay={0.12} className="justify-center italic text-gold">
            sourcing conversation.
          </TextReveal>
        </h2>
        <Reveal delay={0.24}>
          <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-bone/60">
            Whether you&apos;re a retailer, wholesaler, or an emerging brand —
            our Jaipur atelier is ready to manufacture your next collection.
          </p>

          <div className="mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row">
            <Magnetic>
              <a
                href="mailto:maasattijewels@gmail.com"
                data-cursor="Email"
                className="group flex items-center gap-2 rounded-full bg-gold px-9 py-4 text-xs uppercase tracking-[0.2em] text-ink transition hover:bg-gold-light"
              >
                Book an Appointment
                <ArrowUpRight
                  size={14}
                  className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </Magnetic>
            <a
              href="tel:+911414517725"
              className="text-xs uppercase tracking-[0.2em] text-bone/60 transition hover:text-gold"
            >
              +91 141 451 7725
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
