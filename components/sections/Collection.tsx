import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

const PIECES = [
  { image: "/images/products/necklaces.jpg", alt: "Polki and pearl necklace set", span: "md:row-span-2" },
  { image: "/images/products/earrings.jpg", alt: "Emerald and diamond choker with matching earrings", span: "" },
  { image: "/images/products/bangles.jpg", alt: "Layered Polki necklace with emerald drop", span: "" },
  { image: "/images/products/test.jpg", alt: "Diamond and emerald bridal necklace", span: "md:col-span-2" },
];

export function Collection() {
  return (
    <section id="collection" className="bg-ink px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <div className="mb-12 flex flex-col items-start justify-between gap-6 border-b border-gold/15 pb-10 md:flex-row md:items-end">
            <h2 className="font-display text-4xl leading-tight text-bone md:text-5xl">
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

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-2 md:gap-5">
          {PIECES.map((piece, i) => (
            <Reveal key={piece.image} delay={i * 0.08} className={piece.span}>
              <div className="relative h-full min-h-[280px] w-full overflow-hidden rounded-sm">
                <Image
                  src={piece.image}
                  alt={piece.alt}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
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
