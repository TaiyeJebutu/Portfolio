"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

type NavLink = { href: string; label: string };

/** In-page anchors ("#about") are plain links; other pages ("/life/") go through Link so the base path is added. */
function NavAnchor({ href, className, onClick, children }: { href: string; className: string; onClick?: () => void; children: React.ReactNode }) {
  return href.startsWith("#") ? (
    <a href={href} className={className} onClick={onClick}>
      {children}
    </a>
  ) : (
    <Link href={href} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}

export default function Nav({ name, links, homeHref = "#top" }: { name: string; links: NavLink[]; homeHref?: string }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        scrolled || open ? "border-b border-line bg-bg/85 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:px-8">
        <NavAnchor href={homeHref} className="text-base font-bold tracking-tight [font-variation-settings:'wdth'_118]">
          {name}
        </NavAnchor>
        <div className="flex items-center gap-1">
          <ul className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <NavAnchor
                  href={l.href}
                  className="rounded-full px-3 py-1.5 type-small text-muted transition-colors hover:bg-surface hover:text-ink"
                >
                  {l.label}
                </NavAnchor>
              </li>
            ))}
          </ul>
          <ThemeToggle />
          <button
            type="button"
            className="ml-1 rounded-full px-3 py-1.5 type-small text-ink md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.ul
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden px-5 md:hidden"
          >
            {links.map((l) => (
              <li key={l.href} className="border-t border-line">
                <NavAnchor href={l.href} onClick={() => setOpen(false)} className="block py-3 type-h3">
                  {l.label}
                </NavAnchor>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}
