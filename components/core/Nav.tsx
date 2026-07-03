"use client";

import { useState } from "react";
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Magnetic } from "@/components/ui/Magnetic";

const LINKS = [
  { label: "Heritage", href: "#heritage" },
  { label: "Craft", href: "#craft" },
  { label: "Collection", href: "#collection" },
  { label: "Leadership", href: "#team" },
  { label: "Partner With Us", href: "#faq" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 24);
    if (latest < 120) {
      setHidden(false);
    } else {
      setHidden(latest > previous);
    }
  });

  return (
    <motion.header
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled ? "bg-porcelain/80 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 md:px-12">
        <a
          href="#"
          data-cursor="Home"
          className="font-display text-lg tracking-[0.15em] text-ink"
        >
          MAA SATTI <span className="text-gold-deep">JEWELS</span>
        </a>

        <nav
          onMouseLeave={() => setHovered(null)}
          className="hidden items-center gap-1 md:flex"
        >
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onMouseEnter={() => setHovered(link.href)}
              className="relative px-4 py-2 text-xs uppercase tracking-[0.2em] text-ink/60 transition-colors hover:text-ink"
            >
              {hovered === link.href && (
                <motion.span
                  layoutId="nav-hover"
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 rounded-full bg-ink/[0.05]"
                />
              )}
              <span className="relative">{link.label}</span>
            </a>
          ))}
          <Magnetic className="ml-4">
            <a
              href="#contact"
              className="group flex items-center gap-1.5 rounded-full border border-gold-deep/40 px-5 py-2 text-xs uppercase tracking-[0.2em] text-gold-deep transition hover:bg-gold-deep hover:text-porcelain"
            >
              Book a Call
              <ArrowUpRight
                size={14}
                className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </Magnetic>
        </nav>

        <button
          onClick={() => setOpen(true)}
          className="text-ink md:hidden"
          aria-label="Open menu"
        >
          <Menu size={26} />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col bg-porcelain px-6 py-6 md:hidden"
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-lg tracking-[0.15em] text-ink">
                MAA SATTI <span className="text-gold-deep">JEWELS</span>
              </span>
              <button onClick={() => setOpen(false)} aria-label="Close menu">
                <X size={26} className="text-ink" />
              </button>
            </div>
            <div className="mt-16 flex flex-col gap-8">
              {LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className="font-display text-3xl text-ink"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
