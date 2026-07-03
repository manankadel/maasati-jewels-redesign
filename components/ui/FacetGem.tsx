"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { cn } from "@/lib/utils";

/* Brilliant-cut profile, line art. viewBox 0 0 120 104. */
const OUTLINE = "M30 10 L90 10 L112 40 L60 98 L8 40 Z";
const FACETS = [
  "M8 40 L112 40", // girdle
  "M30 10 L44 40", // crown left
  "M90 10 L76 40", // crown right
  "M60 10 L44 40", // crown mid-left
  "M60 10 L76 40", // crown mid-right
  "M44 40 L60 98", // pavilion left
  "M76 40 L60 98", // pavilion right
];

export function FacetGem({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const mx = useMotionValue(0); // -1 .. 1 relative to gem center
  const my = useMotionValue(0);
  const rotateY = useSpring(useTransform(mx, [-1, 1], [-16, 16]), {
    damping: 18,
    stiffness: 120,
  });
  const rotateX = useSpring(useTransform(my, [-1, 1], [12, -12]), {
    damping: 18,
    stiffness: 120,
  });

  useEffect(() => {
    if (reduced) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const move = (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      /* Normalize against viewport size so the tilt eases in from far away. */
      mx.set(Math.max(-1, Math.min(1, (e.clientX - cx) / (window.innerWidth / 2))));
      my.set(Math.max(-1, Math.min(1, (e.clientY - cy) / (window.innerHeight / 2))));
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [mx, my, reduced]);

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn("pointer-events-none", className)}
      style={{ perspective: 600 }}
    >
      <motion.svg
        viewBox="0 0 120 104"
        fill="none"
        className="h-full w-full"
        style={reduced ? undefined : { rotateX, rotateY }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        {/* Facet lines draw themselves in on first view */}
        {[OUTLINE, ...FACETS].map((d, i) => (
          <motion.path
            key={d}
            d={d}
            stroke="var(--gold-deep)"
            strokeWidth={i === 0 ? 1.5 : 0.75}
            strokeLinejoin="round"
            strokeLinecap="round"
            variants={{
              hidden: { pathLength: 0, opacity: 0 },
              visible: { pathLength: 1, opacity: i === 0 ? 0.9 : 0.5 },
            }}
            transition={{
              duration: 1.2,
              delay: 0.15 + i * 0.12,
              ease: [0.65, 0, 0.35, 1],
            }}
          />
        ))}
        {/* A pulse of light travelling around the outline, forever */}
        {!reduced && (
          <motion.path
            d={OUTLINE}
            stroke="var(--gold)"
            strokeWidth={1.5}
            strokeLinejoin="round"
            strokeLinecap="round"
            style={{ pathLength: 0.18, pathSpacing: 1 }}
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            animate={{ pathOffset: [0, 1] }}
            transition={{
              pathOffset: { duration: 4.5, repeat: Infinity, ease: "linear", delay: 1.6 },
            }}
          />
        )}
      </motion.svg>
    </div>
  );
}
