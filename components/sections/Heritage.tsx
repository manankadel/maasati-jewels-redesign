import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";

const STATS = [
  { to: 2003, suffix: "", label: "Founded in Jaipur" },
  { to: 350, suffix: "+", label: "Master craftsmen" },
  { to: 9800, suffix: "+", label: "Pieces produced yearly" },
  { to: 200, suffix: "+", label: "Retail & brand partners" },
];

export function Heritage() {
  return (
    <section id="heritage" className="relative bg-ink px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto grid max-w-[1600px] gap-16 md:grid-cols-2 md:gap-24">
        <Reveal>
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm">
            <Image
              src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=1600&auto=format&fit=crop"
              alt="Jaipur artisan hand-setting Polki jewellery"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 border border-gold/20" />
          </div>
        </Reveal>

        <div className="flex flex-col justify-center">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.35em] text-gold">Our Heritage</p>
            <h2 className="mt-6 font-display text-4xl leading-[1.1] text-bone md:text-5xl">
              Twenty-two years of hands that don&apos;t compromise.
            </h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-bone/65">
              Maa Satti Jewels was built on a single idea: luxury should feel
              light. From a single workshop in Sitapura, we&apos;ve grown into
              one of Jaipur&apos;s largest B2B ateliers — supplying real gold,
              certified diamond, and hand-set Polki jewellery to retailers and
              brands across India and abroad, without ever touching a
              machine-first shortcut.
            </p>
          </Reveal>

          <div className="mt-14 grid grid-cols-2 gap-x-8 gap-y-10">
            {STATS.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.08}>
                <p className="font-display text-4xl text-gold md:text-5xl">
                  <Counter to={stat.to} suffix={stat.suffix} />
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.15em] text-bone/50">
                  {stat.label}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
