"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";

/* Deterministic layout (no Math.random — SSR/client markup must match).
   x/y are % of the container, size in px, delay/duration stagger the idle twinkle. */
const STARS = [
  { x: 6, y: 18, size: 11, delay: 0.0, dur: 3.2 },
  { x: 14, y: 62, size: 8, delay: 1.1, dur: 4.1 },
  { x: 22, y: 34, size: 14, delay: 0.6, dur: 3.6 },
  { x: 31, y: 78, size: 9, delay: 2.0, dur: 4.4 },
  { x: 38, y: 12, size: 10, delay: 1.6, dur: 3.9 },
  { x: 47, y: 52, size: 13, delay: 0.3, dur: 3.4 },
  { x: 55, y: 26, size: 8, delay: 2.4, dur: 4.2 },
  { x: 63, y: 70, size: 12, delay: 0.9, dur: 3.7 },
  { x: 71, y: 40, size: 9, delay: 1.9, dur: 4.0 },
  { x: 79, y: 15, size: 13, delay: 0.5, dur: 3.3 },
  { x: 86, y: 58, size: 10, delay: 1.4, dur: 4.3 },
  { x: 93, y: 30, size: 8, delay: 2.2, dur: 3.8 },
  { x: 51, y: 88, size: 10, delay: 1.2, dur: 4.5 },
  { x: 9, y: 87, size: 9, delay: 0.8, dur: 3.5 },
  { x: 90, y: 82, size: 11, delay: 1.7, dur: 4.1 },
];

const STAR_PATH =
  "M12 0 L14.2 9.8 L24 12 L14.2 14.2 L12 24 L9.8 14.2 L0 12 L9.8 9.8 Z";

function Star({
  x,
  y,
  size,
  delay,
  dur,
  mx,
  my,
  interactive,
}: (typeof STARS)[number] & {
  mx: MotionValue<number>;
  my: MotionValue<number>;
  interactive: boolean;
}) {
  /* Proximity glow: distance from cursor (in % space) → scale + opacity boost. */
  const boost = useTransform([mx, my], (v: number[]) => {
    const dx = v[0] - x;
    const dy = v[1] - y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    return Math.max(0, 1 - dist / 22);
  });
  const springBoost = useSpring(boost, { damping: 20, stiffness: 200 });
  const scale = useTransform(springBoost, [0, 1], [1, 1.9]);
  const glowOpacity = useTransform(springBoost, [0, 1], [0, 0.9]);
  const rotate = useTransform(springBoost, [0, 1], [0, 45]);

  return (
    <motion.span
      className="absolute"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        scale: interactive ? scale : 1,
        rotate: interactive ? rotate : 0,
      }}
    >
      {/* Idle twinkle layer */}
      <motion.svg
        viewBox="0 0 24 24"
        className="absolute inset-0 h-full w-full text-gold-deep"
        initial={{ opacity: 0.15 }}
        animate={
          interactive
            ? { opacity: [0.15, 0.55, 0.15], scale: [1, 1.15, 1] }
            : { opacity: 0.35 }
        }
        transition={
          interactive
            ? { duration: dur, delay, repeat: Infinity, ease: "easeInOut" }
            : undefined
        }
      >
        <path d={STAR_PATH} fill="currentColor" />
      </motion.svg>
      {/* Cursor-proximity glow layer */}
      {interactive && (
        <motion.svg
          viewBox="0 0 24 24"
          className="absolute inset-0 h-full w-full text-gold"
          style={{ opacity: glowOpacity }}
        >
          <path d={STAR_PATH} fill="currentColor" />
        </motion.svg>
      )}
    </motion.span>
  );
}

export function SparkleField({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  /* Cursor position in container-relative % space; parked far away when outside. */
  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);

  useEffect(() => {
    if (reduced) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const move = (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      mx.set(((e.clientX - rect.left) / rect.width) * 100);
      my.set(((e.clientY - rect.top) / rect.height) * 100);
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [mx, my, reduced]);

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn("pointer-events-none absolute inset-0", className)}
    >
      {STARS.map((star) => (
        <Star key={`${star.x}-${star.y}`} {...star} mx={mx} my={my} interactive={!reduced} />
      ))}
    </div>
  );
}
