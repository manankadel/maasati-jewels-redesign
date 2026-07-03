"use client";

import { useEffect, useRef } from "react";
import { usePointer } from "./PointerProvider";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ *
 * A single parameterized canvas particle engine. One instance sits
 * behind each section's content; every instance reads the SAME global
 * pointer (via PointerProvider) so the whole page stays perfectly in
 * sync, but each renders its own jewellery-relatable motif.
 *
 * Perf contract: draws in CSS px on a DPR-capped canvas, reuses all
 * particle objects (zero per-frame allocation), animates ONLY while
 * the section is on-screen and the tab is visible.
 * ------------------------------------------------------------------ */

const GOLD = "200,162,74"; // --gold  #c8a24a
const GOLD_DEEP = "143,107,38"; // --gold-deep #8f6b26

type Motif =
  | "dust" // drifting round specks (gold dust)
  | "sparkle" // 4-point twinkling stars
  | "lattice" // nodes joined by thin lines (kundan/jali)
  | "bokeh" // large soft radial orbs
  | "rays" // radial engraved rays from center
  | "refraction"; // fine light lines fanning from the cursor

type Cursor =
  | "lightBloom" // soft loupe glow follows cursor
  | "attract"
  | "repel"
  | "orbit"
  | "parallax"
  | "refract"
  | "none";

export type BgMode = {
  motif: Motif;
  cursor: Cursor;
  connect: boolean;
  /** particle counts */
  count: number;
  countMobile: number;
  /** base drift speed multiplier */
  speed: number;
  color: "gold" | "goldDeep" | "mixed";
  /** peak alpha ceiling — keeps it a whisper behind text */
  intensity: number;
  /** particle radius range in px */
  rMin: number;
  rMax: number;
  /** cursor influence radius in px */
  reach: number;
};

type P = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  a: number; // base alpha 0..1
  tw: number; // twinkle phase
  tws: number; // twinkle speed
  hue: 0 | 1; // 0 gold, 1 gold-deep
};

const STAR_POINTS = 4;

function rgbFor(color: BgMode["color"], hue: 0 | 1) {
  if (color === "gold") return GOLD;
  if (color === "goldDeep") return GOLD_DEEP;
  return hue === 0 ? GOLD : GOLD_DEEP;
}

export function SectionCanvas({
  mode,
  className,
}: {
  mode: BgMode;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { pointer } = usePointer();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Device flags (client only). reduced-motion is tracked live so a mid-session
    // OS toggle stops/starts the field without a reload.
    const rmq = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reducedNow = rmq.matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const cores = navigator.hardwareConcurrency || 4;
    const nav = navigator as Navigator & {
      deviceMemory?: number;
      connection?: { saveData?: boolean };
    };
    const mem = nav.deviceMemory ?? 4;
    const saveData = nav.connection?.saveData === true;
    // Genuinely weak devices / data-saver: paint one static resting frame, never animate.
    const lowEnd = !fine && (mem <= 2 || cores <= 2 || saveData);
    const tier: "high" | "low" =
      fine && cores >= 8 && window.innerWidth >= 1024 ? "high" : "low";
    const mobile = !fine;
    const budget = tier === "high" ? mode.count : Math.round(mode.count * 0.6);
    const count = Math.max(6, mobile ? mode.countMobile : budget);

    let w = 0;
    let h = 0;
    let raf = 0;
    let running = false;
    let visible = false;

    const particles: P[] = [];
    // Deterministic-ish but varied seeding via a tiny LCG (no Math.random for hydration calm).
    let seed = 1337 + count * 7 + Math.round(mode.reach);
    const rnd = () => {
      seed = (seed * 1103515245 + 12345) & 0x7fffffff;
      return seed / 0x7fffffff;
    };

    // Eased local pointer (canvas-space). Tight lerp = snappy but smooth.
    const local = { x: -9999, y: -9999, has: false };

    function size() {
      const rect = canvas!.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas!.width = Math.max(1, Math.round(w * dpr));
      canvas!.height = Math.max(1, Math.round(h * dpr));
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function seedParticles() {
      particles.length = 0;
      for (let i = 0; i < count; i++) {
        const ang = rnd() * Math.PI * 2;
        const sp = (0.05 + rnd() * 0.25) * mode.speed;
        particles.push({
          x: rnd() * w,
          y: rnd() * h,
          vx: Math.cos(ang) * sp,
          vy: Math.sin(ang) * sp,
          r: mode.rMin + rnd() * (mode.rMax - mode.rMin),
          a: (0.25 + rnd() * 0.75) * mode.intensity,
          tw: rnd() * Math.PI * 2,
          tws: 0.008 + rnd() * 0.02,
          hue: rnd() > 0.5 ? 1 : 0,
        });
      }
    }

    function drawStar(x: number, y: number, r: number, alpha: number, rgb: string) {
      ctx!.beginPath();
      for (let i = 0; i < STAR_POINTS * 2; i++) {
        const rr = i % 2 === 0 ? r : r * 0.38;
        const ang = (Math.PI / STAR_POINTS) * i - Math.PI / 2;
        const px = x + Math.cos(ang) * rr;
        const py = y + Math.sin(ang) * rr;
        if (i === 0) ctx!.moveTo(px, py);
        else ctx!.lineTo(px, py);
      }
      ctx!.closePath();
      ctx!.fillStyle = `rgba(${rgb},${alpha})`;
      ctx!.fill();
    }

    function render() {
      // Ease local pointer toward the global pointer, converted to canvas space.
      const rect = canvas!.getBoundingClientRect();
      const gp = pointer.current;
      const onScreen =
        gp.active &&
        gp.x >= rect.left - mode.reach &&
        gp.x <= rect.right + mode.reach &&
        gp.y >= rect.top - mode.reach &&
        gp.y <= rect.bottom + mode.reach;
      if (onScreen) {
        const tx = gp.x - rect.left;
        const ty = gp.y - rect.top;
        if (!local.has) {
          local.x = tx;
          local.y = ty;
          local.has = true;
        } else {
          // Tight lerp — tracks the cursor closely (feels "synced") yet stays smooth.
          local.x += (tx - local.x) * 0.3;
          local.y += (ty - local.y) * 0.3;
        }
      } else {
        local.has = false;
      }

      ctx!.clearRect(0, 0, w, h);

      // Optional soft loupe glow that trails the cursor.
      if (mode.cursor === "lightBloom" && local.has) {
        const R = mode.reach;
        const g = ctx!.createRadialGradient(local.x, local.y, 0, local.x, local.y, R);
        g.addColorStop(0, `rgba(${GOLD},${0.10 * mode.intensity + 0.05})`);
        g.addColorStop(1, "rgba(200,162,74,0)");
        ctx!.fillStyle = g;
        ctx!.fillRect(local.x - R, local.y - R, R * 2, R * 2);
      }

      // Engraved rays rotate slowly around the section center; cursor nudges angle.
      if (mode.motif === "rays") {
        const cx = w / 2;
        const cy = h / 2;
        const t = performance.now() * 0.00004 * mode.speed;
        const nudge = local.has ? (local.x - cx) / w : 0;
        const rays = 18;
        ctx!.lineWidth = 1;
        for (let i = 0; i < rays; i++) {
          const ang = (Math.PI * 2 * i) / rays + t + nudge * 0.6;
          const len = Math.max(w, h);
          const a = (0.05 + 0.05 * Math.sin(t * 6 + i)) * mode.intensity;
          ctx!.strokeStyle = `rgba(${GOLD_DEEP},${a})`;
          ctx!.beginPath();
          ctx!.moveTo(cx, cy);
          ctx!.lineTo(cx + Math.cos(ang) * len, cy + Math.sin(ang) * len);
          ctx!.stroke();
        }
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Base drift + a gentle sine wander so it's alive without a cursor.
        p.tw += p.tws;
        p.x += p.vx + Math.sin(p.tw) * 0.06;
        p.y += p.vy + Math.cos(p.tw * 0.8) * 0.06;

        // Cursor forces.
        if (local.has && mode.cursor !== "none" && mode.cursor !== "lightBloom") {
          const dx = local.x - p.x;
          const dy = local.y - p.y;
          const d2 = dx * dx + dy * dy;
          const reach2 = mode.reach * mode.reach;
          if (d2 < reach2 && d2 > 0.01) {
            const d = Math.sqrt(d2);
            const f = (1 - d / mode.reach) * 0.6;
            const ux = dx / d;
            const uy = dy / d;
            if (mode.cursor === "attract") {
              p.x += ux * f * 1.4;
              p.y += uy * f * 1.4;
            } else if (mode.cursor === "repel") {
              p.x -= ux * f * 2.2;
              p.y -= uy * f * 2.2;
            } else if (mode.cursor === "orbit") {
              p.x += -uy * f * 1.6;
              p.y += ux * f * 1.6;
            } else if (mode.cursor === "parallax" || mode.cursor === "refract") {
              // handled at draw time (offset / lines)
            }
          }
        }

        // Wrap around edges (toroidal) so the field never depletes.
        if (p.x < -8) p.x = w + 8;
        else if (p.x > w + 8) p.x = -8;
        if (p.y < -8) p.y = h + 8;
        else if (p.y > h + 8) p.y = -8;

        // Parallax: shift render by a fraction of cursor offset from center.
        let rx = p.x;
        let ry = p.y;
        if (mode.cursor === "parallax" && local.has) {
          const depth = (p.r - mode.rMin) / Math.max(0.001, mode.rMax - mode.rMin);
          rx += ((local.x - w / 2) / w) * 18 * depth;
          ry += ((local.y - h / 2) / h) * 18 * depth;
        }

        const twinkle = 0.6 + 0.4 * Math.sin(p.tw);
        let alpha = p.a * twinkle;
        // Cursor proximity brightening for extra life.
        if (local.has && (mode.cursor === "attract" || mode.cursor === "none" || mode.cursor === "refract")) {
          const dx = local.x - rx;
          const dy = local.y - ry;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < mode.reach) alpha = Math.min(1, alpha + (1 - d / mode.reach) * 0.5 * mode.intensity * 2);
        }
        const rgb = rgbFor(mode.color, p.hue);

        if (mode.motif === "sparkle") {
          drawStar(rx, ry, p.r, alpha, rgb);
        } else if (mode.motif === "bokeh") {
          const g = ctx!.createRadialGradient(rx, ry, 0, rx, ry, p.r);
          g.addColorStop(0, `rgba(${rgb},${alpha * 0.8})`);
          g.addColorStop(1, `rgba(${rgb},0)`);
          ctx!.fillStyle = g;
          ctx!.beginPath();
          ctx!.arc(rx, ry, p.r, 0, Math.PI * 2);
          ctx!.fill();
        } else {
          // dust / lattice / refraction nodes are simple dots
          ctx!.fillStyle = `rgba(${rgb},${alpha})`;
          ctx!.beginPath();
          ctx!.arc(rx, ry, p.r, 0, Math.PI * 2);
          ctx!.fill();
        }
      }

      // Connecting lines (lattice) — capped n keeps this O(n^2) cheap.
      if (mode.connect) {
        const maxD = mode.motif === "lattice" ? 120 : 90;
        const maxD2 = maxD * maxD;
        ctx!.lineWidth = 0.6;
        for (let i = 0; i < particles.length; i++) {
          const a = particles[i];
          for (let j = i + 1; j < particles.length; j++) {
            const b = particles[j];
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const d2 = dx * dx + dy * dy;
            if (d2 < maxD2) {
              const la = (1 - d2 / maxD2) * 0.18 * mode.intensity;
              ctx!.strokeStyle = `rgba(${GOLD_DEEP},${la})`;
              ctx!.beginPath();
              ctx!.moveTo(a.x, a.y);
              ctx!.lineTo(b.x, b.y);
              ctx!.stroke();
            }
          }
        }
      }

      // Refraction: fine light lines fanning from cursor through nearby motes.
      if (mode.cursor === "refract" && local.has) {
        ctx!.lineWidth = 0.7;
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          const dx = p.x - local.x;
          const dy = p.y - local.y;
          const d2 = dx * dx + dy * dy;
          const reach2 = mode.reach * mode.reach;
          if (d2 < reach2) {
            const la = (1 - Math.sqrt(d2) / mode.reach) * 0.25 * mode.intensity;
            ctx!.strokeStyle = `rgba(${GOLD},${la})`;
            ctx!.beginPath();
            ctx!.moveTo(local.x, local.y);
            ctx!.lineTo(p.x, p.y);
            ctx!.stroke();
          }
        }
      }
    }

    // On low-power / touch devices, run ambient drift at ~half rate to save battery
    // (imperceptible for slow motion; capable displays still get every frame → 120fps).
    let skip = false;
    function frame() {
      if (!running) return;
      raf = requestAnimationFrame(frame);
      if (tier === "low") {
        skip = !skip;
        if (skip) return;
      }
      render();
    }

    function start() {
      if (running || !visible || reducedNow) return;
      running = true;
      raf = requestAnimationFrame(frame);
    }
    function stop() {
      running = false;
      if (raf) cancelAnimationFrame(raf);
    }

    size();
    seedParticles();
    if (!reducedNow) render(); // one resting frame immediately — no blank flash

    // Low-end / data-saver: static frame only, never spin up an animation loop.
    if (lowEnd) {
      const onResizeStatic = () => {
        size();
        seedParticles();
        if (reducedNow) ctx.clearRect(0, 0, w, h);
        else render();
      };
      const onRmqStatic = () => {
        reducedNow = rmq.matches;
        if (reducedNow) ctx.clearRect(0, 0, w, h);
        else render();
      };
      window.addEventListener("resize", onResizeStatic);
      rmq.addEventListener("change", onRmqStatic);
      return () => {
        window.removeEventListener("resize", onResizeStatic);
        rmq.removeEventListener("change", onRmqStatic);
      };
    }

    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0].isIntersecting;
        if (visible && !document.hidden) start();
        else stop();
      },
      { rootMargin: "80px" }
    );
    io.observe(canvas);

    const onVis = () => {
      if (document.hidden) stop();
      else if (visible) start();
    };
    document.addEventListener("visibilitychange", onVis);

    // Live reduced-motion: stop & clear when enabled mid-session, resume when disabled.
    const onRmq = () => {
      reducedNow = rmq.matches;
      if (reducedNow) {
        stop();
        ctx.clearRect(0, 0, w, h);
      } else if (visible && !document.hidden) {
        start();
      }
    };
    rmq.addEventListener("change", onRmq);

    let resizeRaf = 0;
    const onResize = () => {
      if (resizeRaf) cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(() => {
        const px = particles.map((p) => ({ fx: w ? p.x / w : 0.5, fy: h ? p.y / h : 0.5 }));
        size();
        for (let i = 0; i < particles.length; i++) {
          particles[i].x = px[i].fx * w;
          particles[i].y = px[i].fy * h;
        }
        if (!running) render(); // keep a correct static frame while paused
      });
    };
    window.addEventListener("resize", onResize);

    return () => {
      stop();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("resize", onResize);
      rmq.removeEventListener("change", onRmq);
      if (resizeRaf) cancelAnimationFrame(resizeRaf);
    };
  }, [mode, pointer]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
    />
  );
}
