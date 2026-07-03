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

const W = 1200;
const H = 80;
const REST_Y = H / 2;

/* A horizontal gold thread that bows toward the cursor like a plucked string,
   with a small rotated diamond riding its center. */
export function GoldThread({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const cx = useMotionValue(W / 2); // bezier control point
  const cy = useMotionValue(REST_Y);
  const springX = useSpring(cx, { damping: 14, stiffness: 90 });
  const springY = useSpring(cy, { damping: 14, stiffness: 90 });

  const d = useTransform([springX, springY], (v: number[]) => {
    return `M 0 ${REST_Y} Q ${v[0]} ${v[1]} ${W} ${REST_Y}`;
  });
  /* The center diamond rides the curve's midpoint (t=0.5 of the quadratic). */
  const gemY = useTransform(springY, (y) => (REST_Y + y) / 2 - REST_Y);
  const gemX = useTransform(springX, (x) => (x - W / 2) / 2);

  useEffect(() => {
    if (reduced) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const move = (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const withinX = e.clientX >= rect.left && e.clientX <= rect.right;
      const dy = e.clientY - (rect.top + rect.height / 2);
      /* Only react while the cursor is within reach of the thread. */
      if (withinX && Math.abs(dy) < 160) {
        cx.set(((e.clientX - rect.left) / rect.width) * W);
        cy.set(REST_Y + Math.max(-46, Math.min(46, dy * 0.55)));
      } else {
        cx.set(W / 2);
        cy.set(REST_Y);
      }
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [cx, cy, reduced]);

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn("relative mx-auto h-20 w-full max-w-[1400px] px-6 md:px-12", className)}
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        fill="none"
        className="h-full w-full"
      >
        <motion.path
          d={d}
          stroke="var(--gold-deep)"
          strokeOpacity={0.5}
          strokeWidth={1}
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1] }}
        />
      </svg>
      <motion.span
        className="absolute left-1/2 top-1/2 block h-2 w-2 border border-gold-deep bg-ink"
        style={{
          x: gemX,
          y: gemY,
          rotate: 45,
          marginLeft: -4,
          marginTop: -4,
        }}
      />
    </div>
  );
}
