"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function Cursor() {
  const [label, setLabel] = useState("");
  const [variant, setVariant] = useState<"default" | "hover" | "label">("default");

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { damping: 30, stiffness: 400, mass: 0.4 });
  const springY = useSpring(y, { damping: 30, stiffness: 400, mass: 0.4 });

  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    document.documentElement.classList.add("has-custom-cursor");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);

      if (rafId.current) return;
      rafId.current = requestAnimationFrame(() => {
        rafId.current = null;
        const el = e.target as HTMLElement;
        const target = el.closest<HTMLElement>("[data-cursor]");
        const interactive = el.closest("a, button, [role='button']");

        if (target) {
          const text = target.getAttribute("data-cursor") || "";
          setLabel(text);
          setVariant(text ? "label" : "hover");
        } else if (interactive) {
          setLabel("");
          setVariant("hover");
        } else {
          setLabel("");
          setVariant("default");
        }
      });
    };

    const leave = () => {
      x.set(-100);
      y.set(-100);
    };

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseleave", leave);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [x, y]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[999] mix-blend-difference"
      style={{ x: springX, y: springY }}
    >
      <motion.div
        animate={{
          width: variant === "label" ? 96 : variant === "hover" ? 48 : 10,
          height: variant === "label" ? 96 : variant === "hover" ? 48 : 10,
        }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-bone"
      >
        {label && (
          <motion.span
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            className="font-display text-[10px] uppercase tracking-[0.15em] text-ink"
          >
            {label}
          </motion.span>
        )}
      </motion.div>
    </motion.div>
  );
}
