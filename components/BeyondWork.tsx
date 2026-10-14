import type { BeyondWorkItem } from "@/content/types";
import { Reveal, Section } from "./Reveal";

export default function BeyondWork({ items }: { items: BeyondWorkItem[] }) {
  return (
    <Section id="beyond" title="Beyond work" intro="What I do outside engineering, and what it builds.">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((b, i) => (
          <Reveal key={b.title} delay={(i % 3) * 0.06}>
            <article className="h-full theme-dark rounded-3xl bg-surface p-7">
              <p className="type-h2 text-[2rem]! text-accent">{b.quality}</p>
              <h3 className="type-h3 mt-6">{b.title}</h3>
              <p className="mt-2 text-muted">{b.detail}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
