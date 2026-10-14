import type { Pursuit } from "@/content/life";
import { formatDate } from "@/lib/format";
import { Reveal } from "../Reveal";
import MediaItem from "./MediaItem";
import Progression from "./Progression";

export default function Chapter({ pursuit, flip }: { pursuit: Pursuit; flip: boolean }) {
  const hasMedia = pursuit.media.length > 0;

  return (
    <section id={pursuit.id} aria-labelledby={`${pursuit.id}-title`} className="border-t border-line py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 md:px-8 lg:grid-cols-12 lg:gap-16">
        <Reveal className={hasMedia ? `lg:col-span-5 ${flip ? "lg:order-2" : ""}` : "lg:col-span-12"}>
          <p className="type-small font-semibold text-accent">{pursuit.quality}</p>
          <h2 id={`${pursuit.id}-title`} className="type-h2 mt-2">
            {pursuit.title}
          </h2>
          {pursuit.why && <p className="type-lead mt-5 max-w-[42ch] text-muted">{pursuit.why}</p>}

          <div className={hasMedia ? "" : "grid items-start gap-x-12 lg:mt-4 lg:grid-cols-2"}>
            {pursuit.progression && (
              <div className="mt-10">
                <Progression {...pursuit.progression} />
              </div>
            )}

            {pursuit.milestones.length > 0 && (
              <ol className="mt-10 divide-y divide-line border-y border-line">
                {pursuit.milestones.map((m) => (
                  <li key={m.title} className={`grid gap-3 py-4 ${m.date ? "grid-cols-[6.5rem_1fr]" : ""}`}>
                    {m.date && (
                      <span className="type-small pt-0.5 text-muted">
                        {m.upcoming ? <span className="font-semibold text-accent">Coming up</span> : formatDate(m.date)}
                        {m.upcoming && <span className="block">{formatDate(m.date)}</span>}
                      </span>
                    )}
                    <span>
                      <span className="block font-semibold">{m.title}</span>
                      {m.detail && <span className="block text-muted">{m.detail}</span>}
                    </span>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </Reveal>

        {hasMedia && (
          <Reveal delay={0.08} className={`lg:col-span-7 ${flip ? "lg:order-1" : ""}`}>
            <Gallery media={pursuit.media} />
          </Reveal>
        )}
      </div>
    </section>
  );
}

/**
 * Landscape photos and clips take the full width; portrait ones sit side by side,
 * two or three to a row, so nothing gets cropped into the wrong shape.
 */
function Gallery({ media }: { media: Pursuit["media"] }) {
  const rows: Pursuit["media"][] = [];
  for (const m of media) {
    const last = rows[rows.length - 1];
    const portrait = m.orientation !== "landscape";
    if (portrait && last && last[0].orientation !== "landscape" && last.length < 3) last.push(m);
    else rows.push([m]);
  }
  return (
    <div className="space-y-3">
      {rows.map((row, i) => {
        if (row.length === 1) {
          const m = row[0];
          return (
            <MediaItem
              key={m.src}
              media={m}
              className={m.orientation === "landscape" ? "aspect-video" : "mx-auto aspect-[3/4] w-full max-w-sm"}
            />
          );
        }
        // Side-by-side portraits: a swipeable row on phones, a grid on larger screens.
        return (
          <div
            key={i}
            className={`-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-1 sm:mx-0 sm:grid sm:overflow-visible sm:px-0 sm:pb-0 ${
              row.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"
            }`}
          >
            {row.map((m) => (
              <MediaItem key={m.src} media={m} className="aspect-[9/16] w-[68%] shrink-0 snap-center sm:w-auto" />
            ))}
          </div>
        );
      })}
    </div>
  );
}
