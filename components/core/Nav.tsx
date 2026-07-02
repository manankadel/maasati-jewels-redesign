"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

const LINKS = [
  { label: "Heritage", href: "#heritage" },
  { label: "Craft", href: "#craft" },
  { label: "Collection", href: "#collection" },
  { label: "Leadership", href: "#team" },
  { label: "Partner With Us", href: "#faq" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 md:px-12">
        <a href="#" className="font-display text-lg tracking-[0.15em] text-bone">
          MAA SATTI <span className="text-gold">JEWELS</span>
        </a>

        <nav className="hidden items-center gap-10 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs uppercase tracking-[0.2em] text-bone/70 transition hover:text-gold"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="group flex items-center gap-1.5 rounded-full border border-gold/50 px-5 py-2 text-xs uppercase tracking-[0.2em] text-gold transition hover:bg-gold hover:text-ink"
          >
            Book a Call
            <ArrowUpRight
              size={14}
              className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </nav>

        <button
          onClick={() => setOpen(true)}
          className="text-bone md:hidden"
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
            className="fixed inset-0 z-50 flex flex-col bg-ink px-6 py-6 md:hidden"
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-lg tracking-[0.15em] text-bone">
                MAA SATTI <span className="text-gold">JEWELS</span>
              </span>
              <button onClick={() => setOpen(false)} aria-label="Close menu">
                <X size={26} className="text-bone" />
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
                  className="font-display text-3xl text-bone"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
