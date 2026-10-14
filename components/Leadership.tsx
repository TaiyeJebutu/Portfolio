"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { PublicItem } from "@/lib/data";
import { formatDate } from "@/lib/format";
import { Reveal, Section } from "./Reveal";

export default function Leadership({
  stats,
  practices,
  items,
}: {
  stats: { value: number; suffix?: string; label: string }[];
  practices: { title: string; detail: string }[];
  items: PublicItem[];
}) {
  return (
    <Section
      id="leadership"
      title="Leadership and mentoring"
      intro="Most of my leadership happens around the code: teaching through review, running the team's rhythm, and stepping in when another team needs cover."
    >
      <Reveal>
        <dl className="grid gap-8 sm:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label} className="border-t border-line pt-4">
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="block type-numeral text-6xl md:text-7xl">
                  <Counter value={s.value} />
                  {s.suffix}
                </span>
                <span className="mt-2 block text-muted">{s.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>

      <div className="mt-20 grid gap-x-16 gap-y-10 md:grid-cols-2">
        {practices.map((p, i) => (
          <Reveal key={p.title} delay={(i % 2) * 0.08}>
            <h3 className="type-h3">{p.title}</h3>
            <p className="mt-2 max-w-[54ch] text-muted">{p.detail}</p>
          </Reveal>
        ))}
      </div>

      {items.length > 0 && (
        <Reveal className="mt-20">
          <h3 className="type-h3">Recent evidence</h3>
          <ul className="mt-6 divide-y divide-line border-y border-line">
            {items.slice(0, 5).map((it) => (
              <li key={it.id} className="grid gap-1 py-4 md:grid-cols-[8rem_1fr]">
                <span className="type-small text-muted">{formatDate(it.date)}</span>
                <span>
                  <span className="font-semibold">{it.title}</span>
                  {it.outcomes[0] && <span className="block text-muted">{it.outcomes[0]}</span>}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      )}
    </Section>
  );
}

/** Counts up once when scrolled into view. Renders the real value first, so it reads correctly without JavaScript. */
function Counter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(value);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || reduce || started.current) return;
    started.current = true;
    const controls = animate(0, value, {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setShown(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, value]);

  return <span ref={ref}>{shown}</span>;
}
