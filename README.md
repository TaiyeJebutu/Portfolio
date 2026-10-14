# Portfolio

A personal portfolio site built with Next.js (static export), React, Tailwind CSS and Framer Motion. It is hosted free on GitHub Pages and rebuilds itself every time you push.

The site reads from three files in `content/`, so you update words and evidence without touching components:

| File | What it holds |
| --- | --- |
| `content/site.ts` | Name, statement, about text, toolkit, milestones, leadership, projects, beyond-work, contact links |
| `content/evidence.json` | Evidence records in the Career Evidence Manager format |
| `content/skills.ts` | The SFIA 9 skills from your competency matrix and the four "How I work" areas |

## Put it online (about 10 minutes, free)

1. Create a GitHub account if you don't have one.
2. Create a new **public** repository. Name it `<your-username>.github.io` for the address `https://<your-username>.github.io`, or any other name for `https://<your-username>.github.io/<repo-name>`.
3. Upload the contents of this folder to the repository (drag and drop on github.com works, or `git push`). Include the hidden `.github` folder.
4. In the repository go to **Settings → Pages** and set **Source** to **GitHub Actions**.
5. Open the **Actions** tab. The "Deploy to GitHub Pages" workflow builds and publishes the site; the address appears on the run when it finishes. Every later push redeploys automatically.

GitHub Pages is free for public repositories. A custom domain is optional (Settings → Pages → Custom domain); only the domain itself costs money.

## Before you publish

- Set `name` and the `contact` email and links in `content/site.ts`.
- Check you're comfortable naming your employer and site publicly, and that it fits your company's social media and disclosure policy.
- Never commit programme names, customers, classified or internal details, or metrics you aren't cleared to share. The repository is public.

## Adding evidence

Every record is **private by default**. A record appears on the site only when it has a `publish` block written for a public reader:

```json
{
  "date": "2026-11-04",
  "title": "Internal title, may mention internal things",
  "description": "Full private description",
  "impact": "Impact not yet quantified.",
  "stakeholders": ["Own team"],
  "competencies": [{ "code": "RELM", "level": 5 }, "METL"],
  "evidence_strength": "strong",
  "keywords": [],
  "outcomes": [],
  "tags": ["delivery"],
  "publish": {
    "title": "Redesigned our release checklist",
    "summary": "What you did, why it mattered and who benefited, in public-safe words.",
    "outcomes": ["Public-safe outcome"]
  }
}
```

Safest practice: keep your full record in the Career Evidence Manager project, and only put records you have cleared for publishing into this repository's `evidence.json`. Ask Claude in the project to "prepare website evidence" and it can draft the `publish` blocks for you to approve.

How evidence shows up:

- **Timeline**: every published record, as an expandable card.
- **How I work**: evidence counts per area. Once 3 or more records are published, a radar chart of levels and a skill-by-quarter heatmap appear. Levels on the radar come only from moderate or strong records that state a level.
- **Strongest evidence**: up to three published `strong` records.
- **Leadership**: published records tagged `leadership` or `mentoring`, or mapped to PDSV, DEMG, OFCL or PEMT.

Sections with nothing in them (projects, beyond work, dashboard) stay hidden, so the site never shows empty boxes.

`npm run check` validates `evidence.json` and runs automatically before every deploy.

## Working on it locally (optional)

Needs Node.js 20 or newer.

```bash
npm install
npm run dev           # http://localhost:3000
npm run dev:example   # same site filled with clearly labelled placeholder data, to see every section
```

The example data lives in `content/example.ts` and is never used in a deployed build.

## Design notes

- Type: Archivo, one family used at different widths. Wide for the name and headings, normal for reading.
- Colour: cool sky and deep navy, a teal accent and amber only for strong evidence. Light and dark themes follow the visitor's setting, with a toggle.
- The signature is the hero horizon, an attitude-indicator line that draws out on load and banks as you scroll while the aircraft mark stays level. Elsewhere motion is limited to reveals, the timeline progress line, counters and expanding cards, and all of it respects reduced-motion settings.
