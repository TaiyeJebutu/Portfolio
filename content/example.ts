import type { BeyondWorkItem, EvidenceRecord, Project } from "./types";

/**
 * LAYOUT EXAMPLE ONLY. Invented placeholder data used by `npm run dev:example`
 * so you can see the dashboard, projects and beyond-work sections populated.
 * It is never used in a normal build. Do not copy any of it into evidence.json.
 */
export const exampleEvidence: EvidenceRecord[] = [
  ex("2026-02-10", "Example: release checklist redesign", ["RELM:5", "METL:4"], "strong", ["Example outcome: failed releases fell"], ["delivery"]),
  ex("2026-03-18", "Example: mentoring plan for apprentices", ["PDSV:4"], "moderate", ["Example outcome: plan in use"], ["mentoring"]),
  ex("2026-04-22", "Example: service design review", ["SWDN:5", "DESN:5"], "strong", ["Example outcome: design adopted by two teams"], ["architecture"]),
  ex("2026-05-30", "Example: pytest fixture library", ["PROG:5", "TEST:4"], "moderate", ["Example outcome: shared test setup"], ["technical"]),
  ex("2026-07-08", "Example: cross-team planning workshop", ["OFCL:4", "DEMG:4"], "moderate", ["Example outcome: dependencies agreed"], ["leadership"]),
  ex("2026-08-19", "Example: customer feature demo", ["RLMT:4", "REQM:5"], "weak", [], ["delivery"]),
  ex("2026-09-25", "Example: integration test environment", ["SINT:4", "DEPL:4"], "strong", ["Example outcome: integration issues found earlier"], ["technical"]),
];

export const exampleProjects: Project[] = [
  {
    title: "Example project: release pipeline",
    summary: "Placeholder text showing how a project card reads, with its outcome first and the work second.",
    outcomes: ["Example outcome one", "Example outcome two"],
    tech: ["Python", "Azure DevOps", "pytest"],
    year: "2026",
  },
  {
    title: "Example project: data tooling",
    summary: "Placeholder text for a second card so the grid can be checked at two items.",
    outcomes: ["Example outcome"],
    tech: ["pandas", "Plotly", "FastAPI"],
    year: "2025",
  },
];

export const exampleBeyondWork: BeyondWorkItem[] = [
  { title: "Example: a sport", detail: "Placeholder showing how a personal card reads.", quality: "Teamwork" },
  { title: "Example: a challenge", detail: "Placeholder for a personal challenge.", quality: "Resilience" },
  { title: "Example: learning", detail: "Placeholder for something you are learning.", quality: "Curiosity" },
];

function ex(
  date: string,
  title: string,
  comps: string[],
  strength: EvidenceRecord["evidence_strength"],
  outcomes: string[],
  tags: string[],
): EvidenceRecord {
  return {
    date,
    title,
    description: "Example record.",
    impact: "Impact not yet quantified.",
    stakeholders: [],
    competencies: comps.map((c) => {
      const [code, level] = c.split(":");
      return { code, level: Number(level) };
    }),
    evidence_strength: strength,
    keywords: [],
    outcomes,
    tags,
    publish: {
      title,
      summary: "Placeholder public summary. Real summaries say what you did, why it mattered and who benefited.",
      outcomes,
    },
  };
}
