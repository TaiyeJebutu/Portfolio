"use client";

import { motion } from "framer-motion";
import type { Project } from "@/content/types";
import { Reveal, Section } from "./Reveal";

export default function Projects({ projects }: { projects: Project[] }) {
  return (
    <Section id="projects" title="Projects" intro="Work I can describe publicly, outcome first.">
      <div className="grid gap-8 md:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal key={p.title} delay={(i % 2) * 0.08}>
            <motion.article
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="group flex h-full flex-col overflow-hidden rounded-3xl bg-surface ring-1 ring-line"
            >
              <Pattern seed={p.title} />
              <div className="flex flex-1 flex-col p-6 md:p-8">
                {p.year && <p className="type-small text-muted">{p.year}</p>}
                <h3 className="type-h3 mt-1">{p.title}</h3>
                <p className="mt-3 text-muted">{p.summary}</p>
                {p.outcomes.length > 0 && (
                  <ul className="mt-5 space-y-2">
                    {p.outcomes.map((o) => (
                      <li key={o} className="flex gap-2.5 font-medium">
                        <span aria-hidden="true" className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        {o}
                      </li>
                    ))}
                  </ul>
                )}
                <div className="mt-auto pt-6">
                  <ul className="flex flex-wrap gap-2" aria-label="Technologies">
                    {p.tech.map((t) => (
                      <li key={t} className="rounded-full bg-bg px-3 py-1 type-small">
                        {t}
                      </li>
                    ))}
                  </ul>
                  {p.links && p.links.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-4">
                      {p.links.map((l) => (
                        <a key={l.href} href={l.href} className="font-semibold text-accent underline-offset-4 hover:underline">
                          {l.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/** A generated contour pattern unique to each project, so cards have visual interest without stock imagery. */
function Pattern({ seed }: { seed: string }) {
  let h = 0;
  for (const ch of seed) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  const rand = () => ((h = (h * 1664525 + 1013904223) >>> 0) / 2 ** 32);
  const lines = Array.from({ length: 9 }, (_, i) => {
    const y = 18 + i * 14;
    const a = 6 + rand() * 14;
    const f = 1 + rand() * 2;
    const p = rand() * Math.PI * 2;
    let d = `M0 ${y}`;
    for (let x = 0; x <= 400; x += 20) d += ` L${x} ${(y + Math.sin((x / 400) * Math.PI * f + p) * a).toFixed(1)}`;
    return d;
  });
  return (
    <svg viewBox="0 0 400 140" className="block h-32 w-full bg-accent-soft" preserveAspectRatio="none" aria-hidden="true">
      {lines.map((d, i) => (
        <path
          key={i}
          d={d}
          fill="none"
          stroke="var(--accent)"
          strokeOpacity={0.25 + (i / lines.length) * 0.6}
          strokeWidth="1.4"
          className="transition-transform duration-700 group-hover:translate-x-[-8px]"
        />
      ))}
    </svg>
  );
}
