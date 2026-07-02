"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const FAQS = [
  {
    q: "Do you sell directly to individual customers?",
    a: "No — Maa Satti Jewels is a pure B2B manufacturing unit. We supply retailers, wholesalers, and jewellery brands across India and internationally, not individual consumers.",
  },
  {
    q: "What materials do you work with?",
    a: "Real gold in 14K, 18K, and 22K, set with certified diamonds, Polki, Kundan work, and natural gemstones — all crafted in-house by our team of 350+ artisans.",
  },
  {
    q: "Can you handle large or custom production orders?",
    a: "Yes. Our Sitapura facility produces 9,800+ pieces annually across necklaces, earrings, bangles, brooches, rings, and bridal sets, with capacity for bespoke B2B collections.",
  },
  {
    q: "Which regions do you supply to?",
    a: "We currently serve 200+ partners pan-India and ship to select international B2B clients. Reach out via the contact form to discuss your region.",
  },
  {
    q: "How do we start a partnership?",
    a: "Book an appointment with our team below, or write to us directly — we'll walk you through our catalogue, MOQs, and production timelines.",
  },
];

export function FAQAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-bone px-6 py-28 text-ink md:px-12 md:py-40">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <p className="text-center text-xs uppercase tracking-[0.35em] text-gold-deep">
            Frequently Asked
          </p>
          <h2 className="mt-6 text-center font-display text-4xl leading-tight md:text-5xl">
            Questions our partners ask.
          </h2>
        </Reveal>

        <div className="mt-16 divide-y divide-ink/10 border-y border-ink/10">
          {FAQS.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div key={faq.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span className="font-display text-lg md:text-xl">{faq.q}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    className="shrink-0 text-gold-deep"
                  >
                    <Plus size={20} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 max-w-2xl text-sm leading-relaxed text-ink/60">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
