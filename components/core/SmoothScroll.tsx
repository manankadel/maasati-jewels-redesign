"use client";

import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();

  if (reduced) return <>{children}</>;

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.11,
        duration: 1.2,
        wheelMultiplier: 1,
        touchMultiplier: 1.4,
        anchors: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
