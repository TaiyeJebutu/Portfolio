import About from "@/components/About";
import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import LifeTeaser from "@/components/life/LifeTeaser";
import Leadership from "@/components/Leadership";
import Nav from "@/components/Nav";
import Practice from "@/components/Practice";
import Projects from "@/components/Projects";
import Timeline from "@/components/Timeline";
import { areas } from "@/content/skills";
import { hasDashboard, published, quarterGrid, site, skillStats, strongest } from "@/lib/data";
import { hasLife, life } from "@/lib/life";

export default function Home() {
  const leadershipItems = published.filter((p) =>
    p.tags.some((t) => ["leadership", "mentoring"].includes(t)) ||
    p.skills.some((s) => ["PDSV", "DEMG", "OFCL", "PEMT"].includes(s.code)),
  );

  // Sections without content are left out rather than shown empty.
  const links = [
    { href: "#about", label: "About" },
    { href: "#practice", label: "How I work" },
    { href: "#timeline", label: "Timeline" },
    ...(site.projects.length ? [{ href: "#projects", label: "Projects" }] : []),
    { href: "#leadership", label: "Leadership" },
    { href: "#contact", label: "Contact" },
    ...(hasLife ? [{ href: "/life/", label: "Beyond work" }] : []),
  ];

  return (
    <>
      <Nav name={site.name} links={links} />
      <main id="main">
        <Hero
          name={site.name}
          role={site.role}
          employer={site.employer}
          location={site.location}
          statement={site.statement}
        />
        <About intro={site.intro} note={site.confidentialityNote} toolkit={site.toolkit} />
        <Practice
          areas={areas}
          stats={skillStats}
          grid={quarterGrid()}
          strongest={strongest}
          showDashboard={hasDashboard}
        />
        <Timeline milestones={site.milestones} items={published} />
        {site.projects.length > 0 && <Projects projects={site.projects} />}
        <Leadership stats={site.leadership.stats} practices={site.leadership.practices} items={leadershipItems} />
        {hasLife && <LifeTeaser life={life} />}
      </main>
      <Contact name={site.name} blurb={site.contact.blurb} email={site.contact.email} links={site.contact.links} />
    </>
  );
}
