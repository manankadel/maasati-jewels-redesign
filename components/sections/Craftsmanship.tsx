import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

const STEPS = [
  {
    n: "01",
    title: "Design & CAD",
    copy: "Every piece begins as a hand sketch, refined into precision CAD before a single gram of gold is cut.",
  },
  {
    n: "02",
    title: "Hand-Setting",
    copy: "Master setters place each Polki and diamond by hand — a skill passed down through generations of Jaipur karigars.",
  },
  {
    n: "03",
    title: "Polki & Kundan Work",
    copy: "Uncut diamonds are foiled and set using centuries-old Kundan techniques exclusive to Rajasthan.",
  },
  {
    n: "04",
    title: "Polish & Quality Check",
    copy: "Every piece passes through a multi-point inspection for finish, weight accuracy, and stone security.",
  },
];

export function Craftsmanship() {
  return (
    <section id="craft" className="relative bg-bone px-6 py-28 text-ink md:px-12 md:py-40">
      <div className="mx-auto max-w-[1600px]">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.35em] text-gold-deep">
            Outstanding Production Ability
          </p>
          <h2 className="mt-6 max-w-2xl font-display text-4xl leading-tight md:text-6xl">
            From molten gold to museum-grade finish.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-px overflow-hidden rounded-sm bg-ink/10 md:grid-cols-2">
          {STEPS.map((step, i) => (
            <Reveal key={step.n} delay={i * 0.08}>
              <div className="flex h-full flex-col gap-4 bg-bone p-8 md:p-12">
                <span className="font-display text-sm text-gold-deep">{step.n}</span>
                <h3 className="font-display text-2xl">{step.title}</h3>
                <p className="text-sm leading-relaxed text-ink/60">{step.copy}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="relative mt-6 aspect-[21/9] w-full overflow-hidden rounded-sm">
            <Image
              src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=2400&auto=format&fit=crop"
              alt="Jaipur craftsmen at work in the Maa Satti Jewels atelier"
              fill
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
