"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const curtainVariants: Variants = {
  hidden: { scaleY: 1 },
  visible: { scaleY: 0 },
};

const scaleVariants: Variants = {
  hidden: { scale: 1.22 },
  visible: { scale: 1 },
};

const CURTAIN_COLOR = {
  ink: "bg-ink",
  bone: "bg-bone",
  porcelain: "bg-porcelain",
};

export function ImageReveal({
  children,
  className,
  delay = 0,
  duration = 1.1,
  curtain = "porcelain",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  curtain?: "ink" | "bone" | "porcelain";
}) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="absolute inset-0"
      >
        <motion.div
          variants={scaleVariants}
          transition={{ duration: duration + 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
          className="relative h-full w-full"
        >
          {children}
        </motion.div>
        <motion.div
          variants={curtainVariants}
          transition={{ duration, delay, ease: [0.65, 0, 0.15, 1] }}
          style={{ transformOrigin: "top" }}
          className={cn("absolute inset-0", CURTAIN_COLOR[curtain])}
        />
      </motion.div>
    </div>
  );
}
