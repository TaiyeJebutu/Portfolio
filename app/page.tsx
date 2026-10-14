import About from "@/components/About";
import BeyondWork from "@/components/BeyondWork";
import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import Leadership from "@/components/Leadership";
import Nav from "@/components/Nav";
import Practice from "@/components/Practice";
import Projects from "@/components/Projects";
import Timeline from "@/components/Timeline";
import { areas } from "@/content/skills";
import { hasDashboard, published, quarterGrid, site, skillStats, strongest } from "@/lib/data";

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
    ...(site.beyondWork.length ? [{ href: "#beyond", label: "Beyond work" }] : []),
    { href: "#contact", label: "Contact" },
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
        {site.beyondWork.length > 0 && <BeyondWork items={site.beyondWork} />}
      </main>
      <Contact name={site.name} blurb={site.contact.blurb} email={site.contact.email} links={site.contact.links} />
    </>
  );
}
