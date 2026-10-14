"use client";

import { motion } from "framer-motion";
import type { Step } from "@/content/life";

/** A rising staircase: each step sits higher than the last, the proudest one picked out. */
export default function Progression({ title, steps, note }: { title: string; steps: Step[]; note?: string }) {
  const n = steps.length;
  return (
    <div>
      <h4 className="type-small font-semibold text-muted">{title}</h4>
      <ol className="mt-4 flex items-end gap-2" aria-label={title}>
        {steps.map((s, i) => {
          const height = 4.5 + (i / Math.max(1, n - 1)) * 5; // rem
          return (
            <li key={s.label} className="flex min-w-0 flex-1 flex-col justify-end">
              <span className={`block break-words type-numeral text-2xl md:text-3xl ${s.highlight ? "text-accent" : ""}`}>{s.label}</span>
              {s.detail && <span className="mt-0.5 block type-small text-muted">{s.detail}</span>}
              <motion.span
                aria-hidden="true"
                className={`mt-3 block rounded-t-lg ${s.highlight ? "bg-accent" : "bg-accent-soft"}`}
                style={{ height: `${height}rem`, originY: 1 }}
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 + i * 0.12 }}
              />
            </li>
          );
        })}
      </ol>
      {note && <p className="mt-3 type-small text-muted">{note}</p>}
    </div>
  );
}
