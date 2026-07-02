"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

const lineVariants: Variants = {
  hidden: { y: "110%" },
  visible: { y: "0%" },
};

export function TextReveal({
  children,
  delay = 0,
  duration = 0.9,
  show,
  className,
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  /** When provided, reveal is externally controlled instead of scroll-triggered. */
  show?: boolean;
  className?: string;
}) {
  if (show !== undefined) {
    return (
      <span className={cn("block overflow-hidden", className)}>
        <motion.span
          initial={{ y: "110%" }}
          animate={{ y: show ? "0%" : "110%" }}
          transition={{ duration, delay, ease: EASE }}
          className="block"
        >
          {children}
        </motion.span>
      </span>
    );
  }

  /* The observed element must be the OUTER span: the inner line starts fully
     clipped by overflow-hidden, so an observer on the line itself never fires. */
  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className={cn("block overflow-hidden", className)}
    >
      <motion.span
        variants={lineVariants}
        transition={{ duration, delay, ease: EASE }}
        className="block"
      >
        {children}
      </motion.span>
    </motion.span>
  );
}
