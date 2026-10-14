// SFIA 9 skills tracked in the competency matrix. Labels are public-facing.
export interface Skill {
  code: string;
  name: string;
  short: string;
  primary: boolean;
}

export const skills: Skill[] = [
  { code: "PROG", name: "Programming and software development", short: "Programming", primary: true },
  { code: "SWDN", name: "Software design", short: "Software design", primary: true },
  { code: "ARCH", name: "Solution architecture", short: "Architecture", primary: true },
  { code: "REQM", name: "Requirements definition and management", short: "Requirements", primary: true },
  { code: "RLMT", name: "Stakeholder relationship management", short: "Stakeholders", primary: true },
  { code: "PDSV", name: "Professional development", short: "Developing others", primary: true },
  { code: "DESN", name: "Systems design", short: "Systems design", primary: true },
  { code: "DEMG", name: "Delivery management", short: "Delivery", primary: true },
  { code: "TEST", name: "Functional testing", short: "Testing", primary: false },
  { code: "RELM", name: "Release management", short: "Releases", primary: false },
  { code: "DEPL", name: "Deployment", short: "Deployment", primary: false },
  { code: "SINT", name: "Systems integration and build", short: "Integration", primary: false },
  { code: "METL", name: "Methods and tools", short: "Methods and tools", primary: false },
  { code: "OFCL", name: "Organisational facilitation", short: "Facilitation", primary: false },
  { code: "DLMG", name: "Systems development management", short: "Development planning", primary: false },
  { code: "PEMT", name: "Performance management", short: "People leadership", primary: false },
];

export const skillByCode = Object.fromEntries(skills.map((s) => [s.code, s]));

export const levelNames: Record<number, string> = {
  1: "Follow",
  2: "Assist",
  3: "Apply",
  4: "Enable",
  5: "Ensure, advise",
  6: "Initiate, influence",
  7: "Set strategy, inspire",
};

/** Areas of practice shown on the site, each backed by matrix skills. */
export const areas = [
  {
    title: "Building software",
    detail: "Backend services in Python, desktop applications in C# with MVVM, and the review standards that keep both maintainable.",
    codes: ["PROG", "SWDN"],
  },
  {
    title: "Testing and releasing",
    detail: "Automated tests, CI/CD pipelines in Azure DevOps and the release process that gets work to users safely.",
    codes: ["TEST", "RELM", "DEPL"],
  },
  {
    title: "Architecture and integration",
    detail: "Design and architecture decisions, and supporting integration of our software in the lab.",
    codes: ["ARCH", "DESN", "SINT"],
  },
  {
    title: "Requirements and stakeholders",
    detail: "Working through requirements, then planning and demonstrating features with customers, senior management and other teams.",
    codes: ["REQM", "RLMT"],
  },
];
