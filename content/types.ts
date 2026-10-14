export type Strength = "weak" | "moderate" | "strong";

/** A competency mapping. A bare code ("PROG") is allowed; add a level when the item demonstrates one. */
export type CompetencyRef = string | { code: string; level?: number };

/**
 * One evidence record, in the Career Evidence Manager format.
 * Records are PRIVATE by default. An item appears on the site only when it has
 * a `publish` block written for a public reader (no programme names, customers,
 * classified details or internal metrics you are not cleared to share).
 */
export interface EvidenceRecord {
  date: string; // YYYY-MM-DD or YYYY-MM
  title: string;
  description: string;
  impact: string;
  stakeholders: string[];
  competencies: CompetencyRef[];
  evidence_strength: Strength;
  keywords: string[];
  outcomes: string[];
  tags: string[];
  publish?: {
    title: string;
    summary: string;
    outcomes?: string[];
  };
}

export interface Project {
  title: string;
  summary: string;
  outcomes: string[];
  tech: string[];
  links?: { label: string; href: string }[];
  year?: string;
}

export interface Milestone {
  date: string; // YYYY or YYYY-MM
  title: string;
  detail?: string;
}

export interface BeyondWorkItem {
  title: string;
  detail: string;
  quality: string; // the trait it shows, e.g. "Discipline"
}

export interface SiteConfig {
  name: string;
  role: string;
  employer: string;
  location: string;
  statement: string;
  intro: string[];
  confidentialityNote: string;
  toolkit: { group: string; items: string[] }[];
  milestones: Milestone[];
  leadership: {
    stats: { value: number; suffix?: string; label: string }[];
    practices: { title: string; detail: string }[];
  };
  projects: Project[];
  beyondWork: BeyondWorkItem[];
  contact: {
    blurb: string;
    email?: string;
    links: { label: string; href: string }[];
  };
}
