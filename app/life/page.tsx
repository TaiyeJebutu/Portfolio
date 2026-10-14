import type { Metadata } from "next";
import Contact from "@/components/Contact";
import Nav from "@/components/Nav";
import Bookshelf from "@/components/life/Bookshelf";
import Chapter from "@/components/life/Chapter";
import LifeHero from "@/components/life/LifeHero";
import ShortChapters from "@/components/life/ShortChapters";
import { site } from "@/lib/data";
import { life } from "@/lib/life";

export const metadata: Metadata = {
  title: `Beyond work, ${site.name}`,
  description: life.intro,
};

export default function LifePage() {
  // Chapters with photos or a chart get a full section; short text-only ones share one.
  const full = life.pursuits.filter((p) => p.media.length || p.progression);
  const short = life.pursuits.filter((p) => !p.media.length && !p.progression);

  const links = [
    { href: "/", label: "Work" },
    ...life.pursuits.map((p) => ({ href: `#${p.id}`, label: p.title })),
    ...(life.books.length ? [{ href: "#bookshelf", label: "Bookshelf" }] : []),
    { href: "#contact", label: "Contact" },
  ];

  return (
    <>
      <Nav name={site.name} links={links} homeHref="/" />
      <main id="main">
        <LifeHero intro={life.intro} highlights={life.highlights} />
        {full.map((p, i) => (
          <Chapter key={p.id} pursuit={p} flip={i % 2 === 1} />
        ))}
        {short.length > 0 && <ShortChapters pursuits={short} />}
        {life.books.length > 0 && <Bookshelf books={life.books} intro={life.reading} />}
      </main>
      <Contact name={site.name} blurb={site.contact.blurb} email={site.contact.email} links={site.contact.links} />
    </>
  );
}
