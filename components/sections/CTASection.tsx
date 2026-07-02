import { Reveal } from "@/components/ui/Reveal";
import { ArrowUpRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="relative overflow-hidden bg-ink px-6 py-24 md:px-12 md:py-36">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.06]">
        <span className="font-display text-[28vw] leading-none text-gold">✦</span>
      </div>

      <div className="relative mx-auto max-w-4xl text-center">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.35em] text-gold">
            Let&apos;s Build Something Timeless
          </p>
          <h2 className="mt-6 font-display text-5xl leading-[1.05] text-bone md:text-7xl">
            Begin a bespoke
            <br />
            <span className="italic text-gold">sourcing conversation.</span>
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-bone/60">
            Whether you&apos;re a retailer, wholesaler, or an emerging brand —
            our Jaipur atelier is ready to manufacture your next collection.
          </p>

          <div className="mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row">
            <a
              href="mailto:maasattijewels@gmail.com"
              className="group flex items-center gap-2 rounded-full bg-gold px-9 py-4 text-xs uppercase tracking-[0.2em] text-ink transition hover:bg-gold-light"
            >
              Book an Appointment
              <ArrowUpRight
                size={14}
                className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
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
