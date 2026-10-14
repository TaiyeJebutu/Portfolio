import { exampleLife, life as realLife } from "@/content/life";

const useExample = process.env.NEXT_PUBLIC_EXAMPLE === "1";

const source = useExample ? exampleLife : realLife;

/** Only chapters with something to say are shown. */
export const life = {
  ...source,
  pursuits: source.pursuits.filter((p) => p.why.trim() || p.milestones.length || p.media.length),
};

export const hasLife = life.pursuits.length > 0 || life.books.length > 0;
