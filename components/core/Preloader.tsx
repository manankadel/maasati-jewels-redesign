"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useReady } from "./ReadyContext";

export function Preloader() {
  const [show, setShow] = useState(true);
  const { setReady } = useReady();
  const reduced = useReducedMotion();

  useEffect(() => {
    document.documentElement.classList.add("no-scroll");
    const timer = setTimeout(
      () => {
        setShow(false);
        setReady(true);
        document.documentElement.classList.remove("no-scroll");
      },
      reduced ? 150 : 1400
    );
    return () => {
      clearTimeout(timer);
      document.documentElement.classList.remove("no-scroll");
    };
  }, [setReady, reduced]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          exit={reduced ? { opacity: 0 } : { y: "-100%" }}
          transition={{ duration: reduced ? 0.2 : 1, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-ink"
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="font-display text-sm tracking-[0.5em] text-bone/70"
          >
            MAA SATTI JEWELS
          </motion.p>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.35, ease: [0.65, 0, 0.15, 1] }}
            style={{ transformOrigin: "left" }}
            className="mt-6 h-px w-40 bg-gold"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
