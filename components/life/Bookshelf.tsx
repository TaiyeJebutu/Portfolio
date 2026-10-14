"use client";

import { useState } from "react";
import type { Book } from "@/content/life";
import { Reveal } from "../Reveal";

/** Books grouped by category, with a filter. No cover art: each book is drawn from its title and author. */
export default function Bookshelf({ books, intro }: { books: Book[]; intro?: string }) {
  const categories = Array.from(new Set(books.map((b) => b.category))).sort();
  const [filter, setFilter] = useState<string | null>(null);
  const reading = books.filter((b) => b.status === "reading");
  const shown = books.filter((b) => !filter || b.category === filter);
  const groups = (filter ? [filter] : categories).map((c) => ({ c, items: shown.filter((b) => b.category === c) }));

  return (
    <section id="bookshelf" aria-labelledby="bookshelf-title" className="border-t border-line py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal className="grid gap-6 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="type-small font-semibold text-accent">Curiosity</p>
            <h2 id="bookshelf-title" className="type-h2 mt-2">
              Bookshelf
            </h2>
          </div>
          <p className="type-lead max-w-[38ch] text-muted md:col-span-6 md:col-start-7 md:pt-8">
            {intro ?? (
              <>
                {books.length} {books.length === 1 ? "book" : "books"} across {categories.length}{" "}
                {categories.length === 1 ? "subject" : "subjects"}
                {reading.length > 0 && `, ${reading.length} on the go right now`}.
              </>
            )}
          </p>
        </Reveal>

        {categories.length > 1 && (
          <div className="mt-10 flex flex-wrap gap-2" role="group" aria-label="Filter by subject">
            {[null, ...categories].map((c) => {
              const active = filter === c;
              return (
                <button
                  key={c ?? "all"}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(c)}
                  className={`rounded-full px-4 py-1.5 type-small font-semibold transition-colors ${
                    active ? "bg-ink text-bg" : "border border-line hover:border-ink"
                  }`}
                >
                  {c ?? "All"}
                </button>
              );
            })}
          </div>
        )}

        <div className="mt-12 space-y-14">
          {groups.map(({ c, items }) => (
            <div key={c}>
              {categories.length > 1 && <h3 className="type-h3">{c}</h3>}
              <ul className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((b) => (
                  <li key={b.title + b.author} className="flex gap-4 rounded-2xl bg-surface p-5">
                    <span aria-hidden="true" className="w-1.5 shrink-0 rounded-full" style={{ background: spine(b.category) }} />
                    <div className="min-w-0">
                      {(b.status === "reading" || b.favourite) && (
                        <p className="mb-1 type-small font-semibold text-accent">{b.status === "reading" ? "Reading now" : "Favourite"}</p>
                      )}
                      <p className="font-semibold leading-snug">{b.title}</p>
                      <p className="type-small text-muted">{b.author}</p>
                      {b.takeaway && <p className="mt-3 type-small">{b.takeaway}</p>}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** A stable spine colour per category, from the site palette. */
function spine(category: string) {
  const palette = ["var(--accent)", "var(--signal)", "var(--ink)", "var(--muted)"];
  let h = 0;
  for (const ch of category) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return palette[h % palette.length];
}
