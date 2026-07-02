export function Marquee({ items }: { items: string[] }) {
  const track = [...items, ...items];

  return (
    <div className="relative overflow-hidden border-y border-gold/25 bg-ink-soft py-4">
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
        {track.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-10 font-display text-sm tracking-[0.25em] text-gold uppercase"
          >
            {item}
            <span className="text-gold/40">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
