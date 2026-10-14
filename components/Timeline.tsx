"use client";

import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import { skillByCode } from "@/content/skills";
import type { Milestone } from "@/content/types";
import type { PublicItem } from "@/lib/data";
import { formatDate, itemDate } from "@/lib/format";
import { Reveal, Section } from "./Reveal";

type Entry =
  | { kind: "milestone"; key: string; date: string; title: string; detail?: string }
  | { kind: "evidence"; key: string; date: string; item: PublicItem };

export default function Timeline({ milestones, items }: { milestones: Milestone[]; items: PublicItem[] }) {
  const entries: Entry[] = [
    ...milestones.map((m, i) => ({ kind: "milestone" as const, key: `m${i}`, date: m.date, title: m.title, detail: m.detail })),
    ...items.map((item) => ({ kind: "evidence" as const, key: item.id, date: item.date, item })),
  ].sort((a, b) => b.date.localeCompare(a.date));

  const years = Array.from(new Set(entries.map((e) => e.date.slice(0, 4))));

  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <Section id="timeline" title="Timeline" intro={
        items.length
          ? "Most recent first. Open an entry to see what changed and which skills it shows."
          : "The milestones so far, most recent first."
      }
    >
      <div ref={ref} className="relative">
        <div className="absolute bottom-0 left-[0.4375rem] top-2 w-px bg-line md:left-[9.4375rem]" aria-hidden="true" />
        <motion.div
          className="absolute left-[0.4375rem] top-2 w-px origin-top bg-accent md:left-[9.4375rem]"
          style={{ scaleY: progress, bottom: 0 }}
          aria-hidden="true"
        />
        <ol className="space-y-14">
          {years.map((year) => (
            <li key={year} className="relative grid gap-4 md:grid-cols-[10rem_1fr] md:gap-x-0">
              <Reveal>
                <h3 className="pl-8 type-numeral text-3xl md:pl-0 md:text-4xl">{year}</h3>
              </Reveal>
              <ol className="space-y-3">
                {entries
                  .filter((e) => e.date.startsWith(year))
                  .map((e) => (
                    <li key={e.key} className="relative pl-8 md:pl-10">
                      <span
                        aria-hidden="true"
                        className={`absolute left-0 top-[1.15rem] h-[0.9375rem] w-[0.9375rem] -translate-x-[0.03rem] rounded-full border-2 md:-left-4 ${
                          e.kind === "milestone" ? "border-accent bg-accent" : "border-accent bg-bg"
                        }`}
                      />
                      {e.kind === "milestone" ? (
                        <MilestoneRow title={e.title} detail={e.detail} date={e.date} />
                      ) : (
                        <EvidenceCard item={e.item} />
                      )}
                    </li>
                  ))}
              </ol>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}

function MilestoneRow({ title, detail, date }: { title: string; detail?: string; date: string }) {
  return (
    <Reveal className="py-3">
      <p className="type-small text-muted">{date.length > 4 ? formatDate(date) : "Milestone"}</p>
      <p className="type-h3 mt-0.5">{title}</p>
      {detail && <p className="mt-1 max-w-[60ch] text-muted">{detail}</p>}
    </Reveal>
  );
}

function EvidenceCard({ item }: { item: PublicItem }) {
  const [open, setOpen] = useState(false);
  const panel = `${item.id}-panel`;
  return (
    <Reveal>
      <div className={`rounded-2xl border transition-colors ${open ? "border-accent bg-surface" : "border-line hover:border-muted"}`}>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls={panel}
          className="flex w-full items-start justify-between gap-4 rounded-2xl p-4 text-left md:p-5"
        >
          <span>
            <span className="block type-small text-muted">
              {itemDate(item)}
              {item.strength === "strong" && <span className="ml-2 text-signal">Strong evidence</span>}
            </span>
            <span className="mt-0.5 block font-semibold">{item.title}</span>
          </span>
          <motion.span
            aria-hidden="true"
            animate={{ rotate: open ? 45 : 0 }}
            className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-line text-lg leading-none"
          >
            +
          </motion.span>
        </button>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id={panel}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="space-y-4 px-4 pb-5 md:px-5">
                <p className="max-w-[62ch]">{item.summary}</p>
                {item.outcomes.length > 0 && (
                  <ul className="space-y-1.5">
                    {item.outcomes.map((o) => (
                      <li key={o} className="flex gap-2.5">
                        <span aria-hidden="true" className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        <span>{o}</span>
                      </li>
                    ))}
                  </ul>
                )}
                <ul className="flex flex-wrap gap-2" aria-label="Skills shown">
                  {item.skills.map((s) => (
                    <li key={s.code} className="rounded-full bg-bg px-3 py-1 type-small">
                      {skillByCode[s.code].name}
                      {s.level ? <span className="text-muted">, level {s.level}</span> : null}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Reveal>
  );
}
