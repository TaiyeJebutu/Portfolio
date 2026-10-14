import type { SiteConfig } from "./types";

/**
 * Everything here is drawn from facts you have stated. Replace the two
 * placeholders (name, contact) before publishing, and check that you are
 * comfortable naming your employer publicly.
 */
export const site: SiteConfig = {
  name: "Your Name",
  role: "Senior Software Engineer",
  employer: "Leonardo",
  location: "Luton, England",

  statement:
    "I build and ship Python backend software, help shape its design, and run Scrum for a ten-person engineering team.",

  intro: [
    "I joined Leonardo at its Luton site in 2020. Since then my work has grown from writing code to looking after how it is designed, tested, released and integrated, and how the team around it works.",
    "Day to day that means backend development in Python, testing and CI/CD, architecture and design decisions, and supporting integration in the lab. I also work through requirements with stakeholders and plan and demonstrate features with customers, senior management and other teams.",
    "I'm the main point of contact for the teams we work with, and the person people come to for many of our product's components.",
  ],

  confidentialityNote:
    "Most of my work can't be shown publicly, so this site describes how I work and what changed as a result, rather than the systems themselves.",

  toolkit: [
    { group: "Languages", items: ["Python", "C#"] },
    { group: "Python", items: ["pandas", "NumPy", "Matplotlib", "Plotly", "pytest"] },
    { group: "Frameworks", items: ["Django", "Flask", "FastAPI", "MVVM"] },
    { group: "Delivery", items: ["Azure DevOps", "CI/CD", "PostgreSQL"] },
  ],

  milestones: [
    {
      date: "2020",
      title: "Joined Leonardo",
      detail: "Started at the Luton site.",
    },
    {
      date: "2023",
      title: "Became Scrum Master for my team",
      detail: "Took on the Scrum Master role alongside engineering work.",
    },
    {
      date: "2024",
      title: "Promoted to Senior Software Engineer",
      detail: "After completing a company scheme.",
    },
  ],

  leadership: {
    stats: [
      { value: 3, label: "engineers I mentor" },
      { value: 10, label: "people in the team I run Scrum for" },
      { value: new Date().getFullYear() - 2020, label: "years at Leonardo" },
    ],
    practices: [
      {
        title: "Mentoring",
        detail:
          "I mentor two degree apprentices and a junior software engineer, and use code review as a place to teach, not only to approve.",
      },
      {
        title: "Running the team's Scrum",
        detail:
          "As Scrum Master I facilitate planning, reviews and retrospectives for a team of ten, one of seven teams.",
      },
      {
        title: "Stepping in across teams",
        detail:
          "I regularly cover another software team's team lead and Scrum Master, for days and sometimes weeks, and stand in for tech leads and the product owner when they're away.",
      },
      {
        title: "Working across disciplines",
        detail:
          "I work closely with other software teams and with systems, algorithms and research teams, and I'm the first contact other teams use for our product's components.",
      },
    ],
  },

  // Add projects once they're cleared for public description.
  projects: [],

  // Sports, fitness, challenges, learning, community. Leave empty to hide the section.
  beyondWork: [],

  contact: {
    blurb: "I'm happy to talk about engineering practice, mentoring and how teams ship well.",
    email: "", // e.g. "you@example.com"
    links: [
      // { label: "LinkedIn", href: "https://www.linkedin.com/in/..." },
      // { label: "GitHub", href: "https://github.com/..." },
    ],
  },
};
