"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { TextReveal } from "@/components/ui/TextReveal";
import { Reveal } from "@/components/ui/Reveal";
import { SectionCanvas } from "@/components/core/ReactiveBackground";
import { BG } from "@/components/core/bgModes";

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
    <section id="faq" className="relative isolate bg-bone px-6 py-24 text-ink md:px-12 md:py-32">
      <SectionCanvas mode={BG.faq} />
      <div className="relative z-10 mx-auto max-w-3xl">
        <p className="text-center text-xs uppercase tracking-[0.35em] text-gold-deep">
          <TextReveal className="justify-center">Frequently Asked</TextReveal>
        </p>
        <h2 className="mt-5 text-center font-display text-4xl leading-tight md:text-5xl">
          <TextReveal delay={0.06} className="justify-center">
            Questions our partners ask.
          </TextReveal>
        </h2>

        <div className="mt-14 divide-y divide-ink/10 border-y border-ink/10">
          {FAQS.map((faq, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={faq.q} delay={Math.min(i * 0.04, 0.24)}>
                <div className="relative">
                  <motion.span
                    animate={{ scaleY: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ transformOrigin: "top" }}
                    className="absolute -left-4 top-0 hidden h-full w-px bg-gold-deep md:block"
                  />
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="group flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="font-display text-xs text-gold-deep">
                        0{i + 1}
                      </span>
                      <span
                        className={`font-display text-lg transition-colors md:text-xl ${
                          isOpen ? "text-gold-deep" : "group-hover:text-gold-deep"
                        }`}
                      >
                        {faq.q}
                      </span>
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
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
                        <p className="max-w-2xl pb-6 pl-9 text-sm leading-relaxed text-ink/60">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
