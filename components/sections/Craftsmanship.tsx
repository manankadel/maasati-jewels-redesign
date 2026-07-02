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
    title: "Stone Selection",
    copy: "Polki, certified diamonds, and natural gemstones are hand-selected for brilliance, clarity, and durability.",
  },
  {
    n: "03",
    title: "Hand-Setting",
    copy: "Master setters place each stone by hand under microscope-grade precision — a skill passed through generations.",
  },
  {
    n: "04",
    title: "Polish & Quality Check",
    copy: "Every piece passes a strict multi-point check for finish, stone security, and gold purity before dispatch.",
  },
];

const GALLERY = [
  { src: "/images/production/p4.jpg", alt: "350+ craftsmen at work on the Maa Satti Jewels manufacturing floor", span: "md:col-span-2" },
  { src: "/images/production/p5.jpg", alt: "Hand-setting Polki stones onto a lac base", span: "" },
  { src: "/images/production/p2.jpg", alt: "A craftsman hand-setting an emerald", span: "" },
  { src: "/images/production/p3.jpg", alt: "Macro detail of a finished Polki ring", span: "md:col-span-2" },
];

export function Craftsmanship() {
  return (
    <section id="craft" className="relative bg-bone px-6 py-24 text-ink md:px-12 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.35em] text-gold-deep">
            Outstanding Production Ability
          </p>
          <h2 className="mt-5 max-w-2xl font-display text-4xl leading-tight md:text-5xl">
            From molten gold to museum-grade finish.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-px overflow-hidden rounded-sm bg-ink/10 md:grid-cols-4">
          {STEPS.map((step, i) => (
            <Reveal key={step.n} delay={i * 0.06}>
              <div className="flex h-full flex-col gap-3 bg-bone p-7">
                <span className="font-display text-sm text-gold-deep">{step.n}</span>
                <h3 className="font-display text-xl">{step.title}</h3>
                <p className="text-sm leading-relaxed text-ink/60">{step.copy}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
          {GALLERY.map((img, i) => (
            <Reveal key={img.src} delay={i * 0.06} className={img.span}>
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
