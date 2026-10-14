"use client";

import { motion } from "framer-motion";
import { levelNames, skillByCode } from "@/content/skills";
import type { PublicItem, SkillStat } from "@/lib/data";
import { itemDate } from "@/lib/format";
import { Reveal, Section } from "./Reveal";

interface Area {
  title: string;
  detail: string;
  codes: string[];
}

export default function Practice({
  areas,
  stats,
  grid,
  strongest,
  showDashboard,
}: {
  areas: Area[];
  stats: Record<string, SkillStat>;
  grid: { quarters: string[]; rows: { code: string; cells: number[] }[] };
  strongest: PublicItem[];
  showDashboard: boolean;
}) {
  return (
    <Section
      id="practice"
      title="How I work"
      intro="Four areas of engineering practice. I measure my work against SFIA, the international framework employers and professional bodies use to describe digital and engineering skills."
    >
      <div className="grid gap-x-12 gap-y-12 md:grid-cols-2">
        {areas.map((a, i) => {
          const count = a.codes.reduce((n, c) => n + (stats[c]?.count ?? 0), 0);
          return (
            <Reveal key={a.title} delay={(i % 2) * 0.08}>
              <article className="border-t-2 border-ink pt-5">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="type-h3">{a.title}</h3>
                  {count > 0 && (
                    <span className="type-small text-muted">
                      {count} {count === 1 ? "piece" : "pieces"} of evidence
                    </span>
                  )}
                </div>
                <p className="mt-3 max-w-[52ch] text-muted">{a.detail}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {a.codes.map((c) => (
                    <li key={c} className="rounded-full bg-surface px-3 py-1 type-small">
                      {skillByCode[c].name}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          );
        })}
      </div>

      {showDashboard && (
        <div className="mt-24 grid grid-cols-1 gap-10 lg:grid-cols-12">
          <Reveal className="min-w-0 lg:col-span-12">
            <LevelScale stats={stats} />
          </Reveal>
          <Reveal className="min-w-0 rounded-3xl bg-surface p-6 md:p-8 lg:col-span-5">
            <h3 className="type-h3">Level by skill</h3>
            <p className="mt-2 type-small text-muted">
              Highest level my published evidence supports in each skill. Outer rings are higher levels; ring 5 is senior specialist, ring 6 principal.
            </p>
            <Radar stats={stats} />
          </Reveal>
          <Reveal delay={0.08} className="min-w-0 rounded-3xl bg-surface p-6 md:p-8 lg:col-span-7">
            <h3 className="type-h3">Evidence over time</h3>
            <p className="mt-2 type-small text-muted">Published pieces of evidence per skill, by year.</p>
            <Heatmap grid={grid} />
          </Reveal>
          {strongest.length > 0 && (
            <Reveal className="lg:col-span-12">
              <h3 className="type-h3">Strongest evidence</h3>
              <ul className="mt-6 grid gap-6 md:grid-cols-3">
                {strongest.map((s) => (
                  <li key={s.id} className="border-l-2 border-signal pl-4">
                    <p className="type-small text-muted">{itemDate(s)}</p>
                    <p className="mt-1 font-semibold">{s.title}</p>
                    {s.outcomes[0] && <p className="mt-2 type-small text-muted">{s.outcomes[0]}</p>}
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
        </div>
      )}
    </Section>
  );
}

function Radar({ stats }: { stats: Record<string, SkillStat> }) {
  const axes = Object.values(stats)
    .filter((s) => s.level > 0)
    .sort((a, b) => Number(skillByCode[b.code].primary) - Number(skillByCode[a.code].primary))
    .slice(0, 8);

  if (axes.length < 3) {
    return (
      <ul className="mt-8 space-y-4">
        {axes.map((a) => (
          <LevelBar key={a.code} stat={a} />
        ))}
      </ul>
    );
  }

  const size = 320;
  const c = size / 2;
  const r = 118;
  const point = (i: number, v: number) => {
    const angle = (Math.PI * 2 * i) / axes.length - Math.PI / 2;
    return [c + Math.cos(angle) * (r * v) / 7, c + Math.sin(angle) * (r * v) / 7];
  };
  const poly = axes.map((a, i) => point(i, a.level).join(",")).join(" ");

  return (
    <figure className="mt-6">
      <svg viewBox={`-120 -20 ${size + 240} ${size + 40}`} className="mx-auto w-full max-w-[480px]" role="img" aria-label="Radar chart of evidenced SFIA levels">
        {[1, 2, 3, 4, 5, 6, 7].map((l) => (
          <polygon
            key={l}
            points={axes.map((_, i) => point(i, l).join(",")).join(" ")}
            fill="none"
            stroke="var(--line)"
            strokeWidth={l === 5 || l === 6 ? 1.4 : 0.8}
          />
        ))}
        {[5, 6].map((l) => (
          <text key={l} x={c + 4} y={c - (r * l) / 7 - 3} fontSize="9" fill="var(--muted)">
            {l}
          </text>
        ))}
        {axes.map((_, i) => {
          const [x, y] = point(i, 7);
          return <line key={i} x1={c} y1={c} x2={x} y2={y} stroke="var(--line)" strokeWidth="0.8" />;
        })}
        <motion.polygon
          points={poly}
          fill="var(--accent)"
          fillOpacity={0.18}
          stroke="var(--accent)"
          strokeWidth="2"
          strokeLinejoin="round"
          style={{ transformOrigin: "50% 50%" }}
          initial={{ scale: 0.2, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        />
        {axes.map((a, i) => {
          const [x, y] = point(i, 8.4);
          const anchor = Math.abs(x - c) < 8 ? "middle" : x > c ? "start" : "end";
          return (
            <text key={a.code} x={x} y={y} textAnchor={anchor} dominantBaseline="middle" fontSize="16" fill="var(--ink)">
              {skillByCode[a.code].short}
              <tspan fill="var(--muted)"> {a.level}</tspan>
            </text>
          );
        })}
      </svg>
      <figcaption className="sr-only">
        {axes.map((a) => `${skillByCode[a.code].name}: level ${a.level}`).join("; ")}
      </figcaption>
    </figure>
  );
}

function LevelBar({ stat }: { stat: SkillStat }) {
  return (
    <li>
      <div className="flex justify-between type-small">
        <span>{skillByCode[stat.code].name}</span>
        <span className="text-muted">
          Level {stat.level}, {levelNames[stat.level]}
        </span>
      </div>
      <div className="mt-2 grid grid-cols-7 gap-1" aria-hidden="true">
        {Array.from({ length: 7 }, (_, i) => (
          <span key={i} className={`h-2 rounded-full ${i < stat.level ? "bg-accent" : "bg-line"}`} />
        ))}
      </div>
    </li>
  );
}

function Heatmap({ grid }: { grid: { quarters: string[]; rows: { code: string; cells: number[] }[] } }) {
  const max = Math.max(1, ...grid.rows.flatMap((r) => r.cells));
  return (
    <div className="relative mt-6 overflow-x-auto">
      <table className="w-full min-w-[440px] border-separate border-spacing-1 type-small">
        <caption className="sr-only">Published evidence count per skill per year</caption>
        <thead>
          <tr>
            <th scope="col" className="sr-only">
              Skill
            </th>
            {grid.quarters.map((q) => (
              <th key={q} scope="col" className="pb-1 text-center font-normal text-muted">
                {q.replace(" ", " ")}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {grid.rows.map((row) => (
            <tr key={row.code}>
              <th scope="row" className="whitespace-nowrap pr-3 text-left font-normal">
                {skillByCode[row.code].short}
              </th>
              {row.cells.map((n, i) => (
                <td key={i} className="h-7 min-w-8 rounded-md text-center" style={{ background: n ? `color-mix(in oklab, var(--accent) ${20 + (n / max) * 70}%, transparent)` : "var(--bg)" }}>
                  <span className={n ? `font-semibold ${n / max > 0.5 ? "text-bg" : "text-ink"}` : "sr-only"}>{n || "0"}</span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Plain-language key to SFIA levels, so a reader who has never met SFIA can place the numbers. */
const scale = [
  { level: 1, name: "Follow", role: "Entry level, working under close direction" },
  { level: 2, name: "Assist", role: "Junior, working under routine direction" },
  { level: 3, name: "Apply", role: "Practitioner who works independently on defined tasks" },
  { level: 4, name: "Enable", role: "Experienced professional who guides others" },
  { level: 5, name: "Ensure, advise", role: "Senior specialist or lead, accountable for outcomes and trusted for advice" },
  { level: 6, name: "Initiate, influence", role: "Principal or head of a function, shaping direction across the organisation" },
  { level: 7, name: "Set strategy, inspire", role: "Director or executive, setting strategy for the organisation" },
];

function LevelScale({ stats }: { stats: Record<string, SkillStat> }) {
  const top = Math.max(0, ...Object.values(stats).map((s) => s.level));
  const atTop = Object.values(stats).filter((s) => s.level === top).length;
  return (
    <div>
      <h3 className="type-h3">Reading the levels</h3>
      <p className="mt-2 max-w-[68ch] text-muted">
        SFIA describes responsibility on a seven-step scale. Each step is about autonomy, influence and accountability, not
        years of experience, and level 7 is reserved for people who set an organisation&rsquo;s strategy. The levels below are
        conservative: a level only appears once published evidence supports it.
      </p>
      <ol className="mt-8 grid grid-cols-1 gap-1.5 sm:grid-cols-7 sm:gap-2" aria-label="SFIA levels of responsibility">
        {scale.map((s) => {
          const reached = s.level <= top;
          const current = s.level === top;
          return (
            <li
              key={s.level}
              className={`flex items-start gap-4 rounded-2xl px-4 py-3 sm:block sm:min-h-[11rem] sm:py-4 ${
                current ? "bg-accent text-bg" : reached ? "bg-accent-soft" : "bg-surface"
              }`}
            >
              <p className="type-numeral w-7 shrink-0 text-3xl sm:w-auto">{s.level}</p>
              <div>
              <p className="font-semibold leading-tight sm:mt-2">{s.name}</p>
              <p className={`mt-1 type-small ${current ? "opacity-90" : "text-muted"}`}>{s.role}</p>
              {current && (
                <p className="mt-3 type-small font-semibold">
                  My highest: {atTop} {atTop === 1 ? "skill" : "skills"}
                </p>
              )}
              </div>
            </li>
          );
        })}
      </ol>
      <p className="mt-3 type-small text-muted">
        Typical roles are a guide to scope. SFIA levels are not job titles, and titles differ between employers.
      </p>
    </div>
  );
}
