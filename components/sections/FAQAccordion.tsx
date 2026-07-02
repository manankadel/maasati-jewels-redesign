"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const FAQS = [
  {
    q: "Are you a manufacturer or a retailer?",
    a: "We are a pure manufacturing unit and work exclusively in the B2B sector, supplying jewelry to retailers, wholesalers, and brands.",
  },
  {
    q: "How can we start working with Maa Satti Jewels?",
    a: "You can connect with us through our official channels or visit our factory by prior appointment to discuss requirements and collaborations.",
  },
  {
    q: "What types of stones do you work with?",
    a: "We work with Polki, certified diamonds, and high-quality natural gemstones, selected for brilliance and durability.",
  },
  {
    q: "What purity of gold do you use?",
    a: "We manufacture jewelry in 14K, 18K, and 22K gold, ensuring quality, authenticity, and industry standards.",
  },
  {
    q: "Do you offer custom or made-to-order designs?",
    a: "Yes. We offer customized and bespoke jewelry manufacturing based on client designs, concepts, and specifications.",
  },
  {
    q: "What quality standards do you follow?",
    a: "Every piece undergoes strict quality checks for craftsmanship, stone setting, finishing, and gold purity before dispatch.",
  },
  {
    q: "Do you supply pan-India or internationally?",
    a: "Yes, we supply across India and also cater to international B2B clients.",
  },
  {
    q: "Where is your factory located?",
    a: "Our manufacturing facility is located at F-60, EPIP, Sitapura, Jaipur, Rajasthan – 302022, India.",
  },
];

export function FAQAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-bone px-6 py-24 text-ink md:px-12 md:py-32">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <p className="text-center text-xs uppercase tracking-[0.35em] text-gold-deep">
            Frequently Asked
          </p>
          <h2 className="mt-5 text-center font-display text-4xl leading-tight md:text-5xl">
            Questions our partners ask.
          </h2>
        </Reveal>

        <div className="mt-14 divide-y divide-ink/10 border-y border-ink/10">
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
                      <p className="max-w-2xl pb-6 text-sm leading-relaxed text-ink/60">
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
