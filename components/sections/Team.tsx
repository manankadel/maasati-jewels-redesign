import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

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
        <Reveal>
          <div className="border-b border-gold/15 pb-10">
            <p className="text-xs uppercase tracking-[0.35em] text-gold">Leadership</p>
            <h2 className="mt-5 max-w-xl font-display text-4xl leading-tight text-bone md:text-5xl">
              The hands steering the atelier.
            </h2>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          {TEAM.map((member, i) => (
            <Reveal key={member.name} delay={i * 0.08}>
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
              <p className="mt-5 font-display text-2xl text-bone">{member.name}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-gold">{member.role}</p>
              <p className="mt-3 text-sm leading-relaxed text-bone/60">{member.bio}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
