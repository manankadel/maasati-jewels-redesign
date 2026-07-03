"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
  type MutableRefObject,
} from "react";

export type PointerState = {
  /** Viewport-space cursor position (CSS px). */
  x: number;
  y: number;
  /** Smoothed velocity, px/frame-ish. */
  vx: number;
  vy: number;
  /** True while a real pointer is present & has moved recently. */
  active: boolean;
};

type Ctx = { pointer: MutableRefObject<PointerState> };

const IDLE: PointerState = { x: -9999, y: -9999, vx: 0, vy: 0, active: false };

const PointerCtx = createContext<Ctx | null>(null);

export function PointerProvider({ children }: { children: ReactNode }) {
  const pointer = useRef<PointerState>({ ...IDLE });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return; // touch devices never track a cursor
    const rmq = window.matchMedia("(prefers-reduced-motion: reduce)");

    let lastX = pointer.current.x;
    let lastY = pointer.current.y;
    let idleTimer: ReturnType<typeof setTimeout> | null = null;
    let attached = false;

    const onMove = (e: MouseEvent) => {
      const p = pointer.current;
      p.vx = e.clientX - lastX;
      p.vy = e.clientY - lastY;
      lastX = p.x = e.clientX;
      lastY = p.y = e.clientY;
      p.active = true;
      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        pointer.current.vx = 0;
        pointer.current.vy = 0;
      }, 90);
    };
    const onLeave = () => {
      pointer.current.active = false;
    };

    const attach = () => {
      if (attached) return;
      window.addEventListener("mousemove", onMove, { passive: true });
      document.addEventListener("mouseleave", onLeave);
      attached = true;
    };
    const detach = () => {
      if (!attached) return;
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      attached = false;
      pointer.current.active = false;
    };

    // Track reduced-motion live: no cursor tracking while it's on.
    const sync = () => (rmq.matches ? detach() : attach());
    sync();
    rmq.addEventListener("change", sync);

    return () => {
      detach();
      rmq.removeEventListener("change", sync);
      if (idleTimer) clearTimeout(idleTimer);
    };
  }, []);

  return <PointerCtx.Provider value={{ pointer }}>{children}</PointerCtx.Provider>;
}

export function usePointer(): Ctx {
  const ctx = useContext(PointerCtx);
  if (!ctx) return { pointer: { current: { ...IDLE } } };
  return ctx;
}
