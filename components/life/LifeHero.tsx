"use client";

import { motion } from "framer-motion";
import type { Highlight } from "@/content/life";

const ease = [0.22, 1, 0.36, 1] as const;

export default function LifeHero({ intro, highlights }: { intro: string; highlights: Highlight[] }) {
  return (
    <section id="top" className="pb-16 pt-32 md:pb-24 md:pt-44">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <motion.h1
          className="type-hero max-w-[10ch]"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease }}
        >
          Beyond work
        </motion.h1>
        <motion.p
          className="type-lead mt-8 max-w-[44ch] text-muted"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          {intro}
        </motion.p>

        {highlights.length > 0 && (
          <ul className="mt-16 grid gap-8 border-t border-line pt-8 sm:grid-cols-3">
            {highlights.map((h, i) => (
              <motion.li
                key={h.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease, delay: 0.45 + i * 0.1 }}
              >
                <a href={`#${h.pursuit}`} className="group block">
                  <span className="block type-numeral text-5xl md:text-6xl">{h.value}</span>
                  <span className="mt-2 block max-w-[24ch] text-muted transition-colors group-hover:text-ink">{h.label}</span>
                </a>
              </motion.li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
