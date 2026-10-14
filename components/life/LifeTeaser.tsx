import Link from "next/link";
import type { Life } from "@/content/life";
import { Reveal, Section } from "../Reveal";
import MediaItem from "./MediaItem";

/** Homepage section that points to the Beyond work page. */
export default function LifeTeaser({ life }: { life: Life }) {
  // One still per pursuit: a photo, or a clip's poster image.
  const covers = life.pursuits
    .map((p) => p.media.find((m) => m.featured) ?? p.media.find((m) => m.type === "image") ?? p.media.find((m) => m.poster))
    .filter((m): m is NonNullable<typeof m> => Boolean(m))
    .map((m) => (m.type === "video" ? { type: "image" as const, src: m.poster!, alt: m.alt } : { ...m, caption: undefined }))
    .slice(0, 3);
  return (
    <Section id="beyond" title="Beyond work" intro={life.intro}>
      {covers.length > 0 && (
        <Reveal className={`mb-12 grid gap-3 ${covers.length === 1 ? "max-w-xs" : covers.length === 2 ? "grid-cols-2 sm:max-w-xl" : "grid-cols-3"}`}>
          {covers.map((m) => (
            <MediaItem key={m.src} media={m} className="aspect-[4/5]" />
          ))}
        </Reveal>
      )}
      {life.highlights.length > 0 && (
        <Reveal>
          <ul className="grid gap-8 sm:grid-cols-3">
            {life.highlights.map((h) => (
              <li key={h.label} className="border-t border-line pt-4">
                <span className="block type-numeral text-5xl">{h.value}</span>
                <span className="mt-2 block max-w-[24ch] text-muted">{h.label}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      )}
      <Reveal className="mt-12">
        <Link
          href="/life/"
          className="inline-block rounded-full bg-ink px-5 py-2.5 text-[0.95rem] font-semibold text-bg transition-transform hover:-translate-y-0.5"
        >
          See life beyond work
        </Link>
      </Reveal>
    </Section>
  );
}
