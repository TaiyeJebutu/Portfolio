import type { Pursuit } from "@/content/life";
import { formatDate } from "@/lib/format";
import { Reveal } from "../Reveal";

/** Pursuits with just a few lines and no photos, set side by side so they don't each fill a screen. */
export default function ShortChapters({ pursuits }: { pursuits: Pursuit[] }) {
  return (
    <section aria-label="More beyond work" className="border-t border-line py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-16 px-5 md:grid-cols-2 md:px-8">
        {pursuits.map((p, i) => (
          <Reveal key={p.id} delay={(i % 2) * 0.08}>
            <article id={p.id} aria-labelledby={`${p.id}-title`} className="scroll-mt-24">
              <p className="type-small font-semibold text-accent">{p.quality}</p>
              <h2 id={`${p.id}-title`} className="type-h2 mt-2">
                {p.title}
              </h2>
              {p.why && <p className="type-lead mt-5 max-w-[42ch] text-muted">{p.why}</p>}
              {p.milestones.length > 0 && (
                <ul className="mt-8 divide-y divide-line border-y border-line">
                  {p.milestones.map((m) => (
                    <li key={m.title} className="py-4">
                      {m.date && <span className="block type-small text-muted">{formatDate(m.date)}</span>}
                      <span className="block font-semibold">{m.title}</span>
                      {m.detail && <span className="block text-muted">{m.detail}</span>}
                    </li>
                  ))}
                </ul>
              )}
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
