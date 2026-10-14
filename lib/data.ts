import evidenceJson from "@/content/evidence.json";
import { exampleBeyondWork, exampleEvidence, exampleProjects } from "@/content/example";
import { site as baseSite } from "@/content/site";
import { skillByCode } from "@/content/skills";
import type { EvidenceRecord, SiteConfig, Strength } from "@/content/types";

const useExample = process.env.NEXT_PUBLIC_EXAMPLE === "1";

export const site: SiteConfig = useExample
  ? { ...baseSite, projects: exampleProjects, beyondWork: exampleBeyondWork }
  : baseSite;

const records: EvidenceRecord[] = useExample ? exampleEvidence : (evidenceJson as EvidenceRecord[]);

export interface PublicItem {
  id: string;
  date: string;
  year: string;
  title: string;
  summary: string;
  outcomes: string[];
  skills: { code: string; level?: number }[];
  strength: Strength;
  tags: string[];
}

const strengthRank: Record<Strength, number> = { weak: 1, moderate: 2, strong: 3 };

/** Only records with a `publish` block reach the site. Every number shown is computed from these. */
export const published: PublicItem[] = records
  .filter((r) => r.publish && r.publish.title && r.publish.summary)
  .map((r, i) => ({
    id: `e${i}`,
    date: r.date,
    year: r.date.slice(0, 4),
    title: r.publish!.title,
    summary: r.publish!.summary,
    outcomes: r.publish!.outcomes ?? [],
    skills: r.competencies
      .map((c) => (typeof c === "string" ? { code: c } : c))
      .filter((c) => skillByCode[c.code]),
    strength: r.evidence_strength,
    tags: r.tags ?? [],
  }))
  .sort((a, b) => b.date.localeCompare(a.date));

export interface SkillStat {
  code: string;
  count: number;
  /** Highest level shown by moderate or strong evidence. */
  level: number;
  best: Strength;
}

export const skillStats: Record<string, SkillStat> = {};
for (const item of published) {
  for (const s of item.skills) {
    const st = (skillStats[s.code] ??= { code: s.code, count: 0, level: 0, best: "weak" });
    st.count += 1;
    if (strengthRank[item.strength] > strengthRank[st.best]) st.best = item.strength;
    if (s.level && item.strength !== "weak") st.level = Math.max(st.level, s.level);
  }
}

/** Skill x quarter evidence counts for the heatmap. */
export function quarterGrid() {
  if (!published.length) return { quarters: [] as string[], rows: [] as { code: string; cells: number[] }[] };
  const q = (d: string) => `${d.slice(0, 4)} Q${Math.ceil(Number(d.slice(5, 7) || "1") / 3)}`;
  const toIndex = (label: string) => Number(label.slice(0, 4)) * 4 + Number(label.slice(-1)) - 1;
  const labels = published.map((p) => q(p.date));
  const min = Math.min(...labels.map(toIndex));
  const max = Math.max(...labels.map(toIndex));
  const quarters: string[] = [];
  for (let i = Math.max(min, max - 7); i <= max; i++) quarters.push(`${Math.floor(i / 4)} Q${(i % 4) + 1}`);
  const codes = Object.keys(skillStats).sort((a, b) => skillStats[b].count - skillStats[a].count);
  const rows = codes.map((code) => ({
    code,
    cells: quarters.map(
      (label) => published.filter((p) => q(p.date) === label && p.skills.some((s) => s.code === code)).length,
    ),
  }));
  return { quarters, rows };
}

export const strongest = published.filter((p) => p.strength === "strong").slice(0, 3);

export const hasDashboard = published.length >= 3;

export function byTag(tag: string) {
  return published.filter((p) => p.tags.includes(tag));
}
