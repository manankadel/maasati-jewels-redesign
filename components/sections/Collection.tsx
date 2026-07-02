import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

const PIECES = [
  {
    image:
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?q=80&w=1400&auto=format&fit=crop",
    span: "md:row-span-2",
  },
  {
    image:
      "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?q=80&w=1400&auto=format&fit=crop",
    span: "",
  },
  {
    image:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1400&auto=format&fit=crop",
    span: "",
  },
  {
    image:
      "https://images.unsplash.com/photo-1544376664-80b17f09d399?q=80&w=1400&auto=format&fit=crop",
    span: "md:col-span-2",
  },
];

export function Collection() {
  return (
    <section id="collection" className="bg-ink px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto max-w-[1600px]">
        <Reveal>
          <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <h2 className="font-display text-4xl leading-tight text-bone md:text-6xl">
              A collection built for
              <br />
              <span className="italic text-gold">the brands you know.</span>
            </h2>
            <a
              href="#contact"
              className="whitespace-nowrap text-xs uppercase tracking-[0.2em] text-gold underline underline-offset-4"
            >
              Request the full catalogue
            </a>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-2 md:gap-6">
          {PIECES.map((piece, i) => (
            <Reveal key={i} delay={i * 0.08} className={piece.span}>
              <div className="relative h-full min-h-[280px] w-full overflow-hidden rounded-sm">
                <Image
                  src={piece.image}
                  alt="Maa Satti Jewels handcrafted piece"
                  fill
                  className="object-cover transition duration-700 hover:scale-105"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
