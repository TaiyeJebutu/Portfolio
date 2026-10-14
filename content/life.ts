/**
 * Life beyond work: the "Beyond work" page and the homepage teaser.
 *
 * Media files go in public/life/ and are referenced as "/life/your-file.jpg".
 * Photos: JPEG or WebP, about 1600px wide, under 500 KB, location data removed.
 * Videos: MP4 (H.264), 10 seconds or less, under 5 MB, no sound needed. Add a
 * poster image (a still from the clip) so something shows while it loads.
 *
 * Anything left empty is hidden on the site, so you can fill this in gradually.
 */

export interface Media {
  type: "image" | "video";
  src: string; // e.g. "/life/norway-finish.jpg"
  alt: string; // one line describing what's in it
  poster?: string; // videos only: a still image shown before playing
  orientation?: "portrait" | "landscape"; // how it was filmed; sets its shape on the page
  caption?: string; // shown on the photo or clip; leave empty for none
  featured?: boolean; // use this one on the homepage teaser
}

export interface Step {
  label: string; // e.g. "V6"
  detail?: string; // e.g. "1 climb"
  highlight?: boolean; // the step you're proudest of
}

export interface Milestone {
  date?: string; // "2026-06" or "2026"; leave out if you don't know
  title: string;
  detail?: string;
  upcoming?: boolean;
}

export interface Pursuit {
  id: string; // used in the page address, e.g. #running
  title: string;
  quality: string; // the trait it shows, e.g. "Persistence"
  why: string; // a sentence or two in your own words
  progression?: { title: string; steps: Step[]; note?: string };
  milestones: Milestone[];
  media: Media[]; // first item is the large cover
}

export interface Highlight {
  value: string; // short, e.g. "27:33"
  label: string; // e.g. "5 km at a run festival in Norway"
  pursuit: string; // id of the pursuit it belongs to
}

export interface Book {
  title: string;
  author: string;
  category: string; // any category you like: "Philosophy", "Engineering", "Fiction"...
  status: "reading" | "read";
  takeaway?: string; // one line on what stayed with you
  favourite?: boolean;
}

export interface Life {
  intro: string;
  highlights: Highlight[];
  pursuits: Pursuit[];
  reading?: string; // a line introducing the bookshelf
  books: Book[];
}

export const life: Life = {
  intro:
    "Outside engineering I climb, run, lift and read. These are the things I've worked at, and what they've taught me about sticking with something hard.",

  highlights: [
    { value: "4 months", label: "from not running 1 km to a 5 km race", pursuit: "running" },
    { value: "27:33", label: "5 km at a run festival in Norway", pursuit: "running" },
    { value: "V6", label: "hardest boulder problem climbed", pursuit: "climbing" },
  ],

  pursuits: [
    {
      id: "running",
      title: "Running",
      quality: "Persistence",
      why: "I started unable to run a single kilometre. Four months later I ran 5 km at a run festival in Norway.",
      progression: {
        title: "From zero to 5 km",
        steps: [
          { label: "<1 km", detail: "Where I started" },
          { label: "5 km", detail: "Four months later, in 27:33", highlight: true },
        ],
      },
      milestones: [{ date: "2026-10", title: "Ran 5 km at Runfest in Norway", detail: "Finished in 27:33." }],
      media: [
        {
          type: "image",
          src: "/life/runfest-bib.jpg",
          orientation: "portrait",
          alt: "Holding my Runfest 2026 race bib, number 5093",
          caption: "",
        },
        {
          type: "image",
          src: "/life/runfest-medal.jpg",
          orientation: "portrait",
          alt: "Holding my Runfest 2026 finisher's medal",
          caption: "",
        },
      ],
    },
    {
      id: "climbing",
      title: "Bouldering",
      quality: "Problem-solving",
      why: "Bouldering is short, hard problems you work out one move at a time. I'm a solid V4 climber and have climbed problems up to V6.",
      progression: {
        title: "Hardest grades climbed",
        steps: [
          { label: "V4", detail: "Solid, consistently" },
          { label: "V5", detail: "2 climbs" },
          { label: "V6", detail: "1 climb", highlight: true },
        ],
        note: "Bouldering grades run from V0 upwards; each grade is a clear step harder than the last.",
      },
      milestones: [
        { date: "2026-11", title: "Bouldering competition", detail: "Training for it now.", upcoming: true },
      ],
      media: [
        {
          type: "video",
          src: "/life/climbing-gym-oslo.mp4",
          poster: "/life/climbing-gym-oslo.jpg",
          orientation: "landscape",
          alt: "Walking through a large bouldering gym in Oslo",
          caption: "",
        },
        {
          type: "video",
          src: "/life/climb-attempt-fall.mp4",
          poster: "/life/climb-attempt-fall.jpg",
          orientation: "portrait",
          alt: "Working up an overhanging boulder problem, then falling off near the top onto the mat",
          caption: "", // e.g. the grade, and what you changed on the next go
        },
        {
          type: "video",
          src: "/life/climb-top-out.mp4",
          poster: "/life/climb-top-out.jpg",
          featured: true,
          orientation: "portrait",
          alt: "Climbing a boulder problem to the top hold, then dropping down",
          caption: "",
        },
      ],
    },
    {
      id: "gym",
      title: "Gym",
      quality: "Consistency",
      why: "I go to the gym to build strength and to help me keep a healthy lifestyle.",
      milestones: [],
      media: [],
    },
    {
      id: "gaming",
      title: "Gaming",
      quality: "Teamwork",
      why: "I used to play a lot: Kerbal Space Program, War Thunder, Fortnite, CS:GO and Rocket League. I don't really game any more, but at one point I was playing CS:GO at a semi-professional level.",
      milestones: [{ title: "Reached semi-pro level in CS:GO", detail: "Competitive five-a-side team play." }],
      media: [],
    },
  ],

  reading: "I mainly read fantasy. These are my favourites.",

  // Add every book you're reading or have read. The shelf groups them by category.
  books: [
    { title: "Lord of the Mysteries", author: "Cuttlefish That Loves Diving", category: "Fantasy", status: "read", favourite: true },
    { title: "Throne of Magical Arcana", author: "Cuttlefish That Loves Diving", category: "Fantasy", status: "read", favourite: true },
  ],
};

/* ---------------------------------------------------------------------------
 * LAYOUT EXAMPLE ONLY, used by `npm run dev:example` to show the page with
 * photos and books filled in. Never used in a normal build.
 * ------------------------------------------------------------------------- */
export const exampleLife: Life = {
  ...life,
  pursuits: life.pursuits.map((p, i) => ({
    ...p,
    why: p.why || "Example: a sentence or two on why you do this.",
    milestones: p.milestones.length ? p.milestones : [{ date: "2026", title: "Example milestone" }],
    media: [
      { type: "image", src: `/examples/photo-${(i % 3) + 1}.svg`, alt: "Example photo", orientation: "landscape", caption: "Example caption: your own line about this moment." },
      { type: "image", src: `/examples/photo-${((i + 1) % 3) + 1}.svg`, alt: "Example photo" },
      { type: "image", src: `/examples/photo-${((i + 2) % 3) + 1}.svg`, alt: "Example photo" },
    ],
  })),
  books: [
    { title: "Example book one", author: "Author Name", category: "Philosophy", status: "reading", takeaway: "Example: one line on what stayed with you." },
    { title: "Example book two", author: "Author Name", category: "Philosophy", status: "read" },
    { title: "Example book three", author: "Author Name", category: "Engineering", status: "read", takeaway: "Example takeaway." },
    { title: "Example book four", author: "Author Name", category: "Fiction", status: "read" },
    { title: "Example book five", author: "Author Name", category: "Engineering", status: "read" },
  ],
};
