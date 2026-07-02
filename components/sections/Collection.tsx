import Image from "next/image";
import { TextReveal } from "@/components/ui/TextReveal";
import { ImageReveal } from "@/components/ui/ImageReveal";
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
        <div className="mb-12 flex flex-col items-start justify-between gap-6 border-b border-gold/15 pb-10 md:flex-row md:items-end">
          <h2 className="font-display text-4xl leading-tight text-bone md:text-5xl">
            <TextReveal>A collection built for</TextReveal>
            <TextReveal delay={0.08} className="italic text-gold">
              the brands you know.
            </TextReveal>
          </h2>
          <Reveal>
            <a
              href="#contact"
              data-cursor="Request"
              className="whitespace-nowrap text-xs uppercase tracking-[0.2em] text-gold underline underline-offset-4"
            >
              Request the full catalogue
            </a>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-2 md:gap-5">
          {PIECES.map((piece, i) => (
            <ImageReveal
              key={piece.image}
              delay={i * 0.08}
              className={`group h-full min-h-[280px] w-full rounded-sm ${piece.span}`}
            >
              <a href="#contact" data-cursor="View Piece" className="relative block h-full w-full">
                <Image
                  src={piece.image}
                  alt={piece.alt}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </a>
            </ImageReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
