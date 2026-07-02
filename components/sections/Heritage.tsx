import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";

const STATS = [
  { to: 9800, suffix: "+", label: "Production capacity, per year" },
  { to: 350, suffix: "+", label: "In-house craftsmen" },
  { to: 200, suffix: "+", label: "Happy retail & brand clients" },
];

export function Heritage() {
  return (
    <section id="heritage" className="relative bg-ink px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto grid max-w-[1400px] gap-14 md:grid-cols-2 md:gap-20">
        <Reveal>
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm">
            <Image
              src="/images/production/p4.jpg"
              alt="The Maa Satti Jewels manufacturing floor in Sitapura, Jaipur"
              fill
              sizes="(min-width: 768px) 45vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 border border-gold/20" />
          </div>
        </Reveal>

        <div className="flex flex-col justify-center">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.35em] text-gold">
              Our Heritage &middot; Est. 2003
            </p>
            <h2 className="mt-5 font-display text-4xl leading-[1.1] text-bone md:text-5xl">
              Home to some of Jaipur&apos;s finest master craftsmen.
            </h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-bone/65">
              Maa Satti Jewels preserves timeless artistry through exclusive
              handmade creations that reflect rich heritage and unmatched
              precision. Known for its signature light-weight luxury, the
              brand designs jewellery that offers comfort without
              compromising on elegance — a seamless balance of tradition and
              modern trends, achieved through expert craftsmanship and smart
              design.
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-3 gap-x-6 gap-y-8">
            {STATS.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.08}>
                <p className="font-display text-3xl text-gold md:text-4xl">
                  <Counter to={stat.to} suffix={stat.suffix} />
                </p>
                <p className="mt-2 text-xs uppercase leading-snug tracking-[0.1em] text-bone/50">
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
