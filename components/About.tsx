import { Reveal, Section } from "./Reveal";

export default function About({
  intro,
  note,
  toolkit,
}: {
  intro: string[];
  note: string;
  toolkit: { group: string; items: string[] }[];
}) {
  return (
    <Section id="about" title="About" intro={intro[0]}>
      <div className="grid gap-14 md:grid-cols-12">
        <Reveal className="space-y-5 md:col-span-6 md:col-start-7">
          {intro.slice(1).map((p) => (
            <p key={p} className="max-w-[60ch]">
              {p}
            </p>
          ))}
          <p className="max-w-[60ch] border-l-2 border-accent pl-4 text-muted">{note}</p>
        </Reveal>
        <Reveal delay={0.1} className="md:col-span-5 md:row-start-1">
          <h3 className="type-h3">Toolkit</h3>
          <dl className="mt-6 divide-y divide-line border-y border-line">
            {toolkit.map((t) => (
              <div key={t.group} className="grid grid-cols-[7.5rem_1fr] gap-4 py-3.5">
                <dt className="type-small pt-0.5 text-muted">{t.group}</dt>
                <dd className="flex flex-wrap gap-x-4 gap-y-1 font-medium">
                  {t.items.map((i) => (
                    <span key={i}>{i}</span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  );
}
