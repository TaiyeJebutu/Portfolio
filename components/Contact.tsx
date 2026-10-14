import { Reveal } from "./Reveal";

export default function Contact({
  name,
  blurb,
  email,
  links,
}: {
  name: string;
  blurb: string;
  email?: string;
  links: { label: string; href: string }[];
}) {
  const year = new Date().getFullYear();
  return (
    <footer id="contact" className="theme-dark border-t border-line bg-bg">
      <div className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
        <Reveal>
          <h2 className="type-hero text-[clamp(2.75rem,7vw,5.5rem)]!">Let&rsquo;s talk.</h2>
          <p className="type-lead mt-6 max-w-[40ch] text-muted">{blurb}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            {email && (
              <a href={`mailto:${email}`} className="rounded-full bg-accent px-5 py-2.5 font-semibold text-bg">
                Email me
              </a>
            )}
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                rel="me noopener"
                className="rounded-full border border-line px-5 py-2.5 font-semibold transition-colors hover:border-ink"
              >
                {l.label}
              </a>
            ))}
          </div>
        </Reveal>
        <p className="mt-24 type-small text-muted">
          © {year} {name}. Built with Next.js and published on GitHub Pages.
        </p>
      </div>
    </footer>
  );
}
