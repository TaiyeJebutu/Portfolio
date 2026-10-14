"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * The one signature moment: an attitude-indicator horizon that draws out from the
 * centre on load and banks gently as you scroll. A quiet nod to where the work happens.
 */
export default function Hero({
  name,
  role,
  employer,
  location,
  statement,
}: {
  name: string;
  role: string;
  employer: string;
  location: string;
  statement: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const rotate = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -7]);
  const lift = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 60]);

  return (
    <section ref={ref} id="top" className="relative flex min-h-[82svh] md:min-h-[100svh] flex-col justify-end overflow-hidden pb-14 pt-28 md:pb-20">
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <motion.p
          className="type-small text-muted"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {role} at {employer}, {location}
        </motion.p>
        <motion.h1
          className="type-hero mt-4 max-w-[12ch]"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease }}
        >
          {name}
        </motion.h1>
      </div>

      <div aria-hidden="true" className="relative my-10 md:my-14">
        <motion.div style={{ rotate, y: lift }}>
          <Horizon />
        </motion.div>
        {/* the aircraft mark stays level while the horizon banks, as on a real instrument */}
        <AircraftMark />
      </div>

      <div className="mx-auto grid w-full max-w-6xl gap-8 px-5 md:grid-cols-12 md:px-8">
        <motion.p
          className="type-lead max-w-[34ch] md:col-span-7"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 1.0 }}
        >
          {statement}
        </motion.p>
        <motion.div
          className="flex flex-wrap items-start gap-3 md:col-span-5 md:justify-end md:pt-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.25 }}
        >
          <a
            href="#practice"
            className="rounded-full bg-ink px-5 py-2.5 text-[0.95rem] font-semibold text-bg transition-transform hover:-translate-y-0.5"
          >
            See how I work
          </a>
          <a
            href="#contact"
            className="rounded-full border border-line px-5 py-2.5 text-[0.95rem] font-semibold transition-colors hover:border-ink"
          >
            Get in touch
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function Horizon() {
  const draw = (delay: number) => ({
    initial: { pathLength: 0 },
    animate: { pathLength: 1 },
    transition: { duration: 1.1, ease, delay },
  });
  // pitch ladder: 10 and 5 degree marks above and below, as on an attitude indicator
  const ladder = [
    { y: -44, w: 64, label: "10" },
    { y: -22, w: 32 },
    { y: 22, w: 32 },
    { y: 44, w: 64, label: "10" },
  ];

  return (
    <svg viewBox="0 0 1200 140" className="block h-auto w-[250%] -translate-x-[30%] md:w-[115%] md:-translate-x-[6.5%] overflow-visible" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--accent-soft)" stopOpacity="0.9" />
          <stop offset="1" stopColor="var(--accent-soft)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* ground: a wash below the horizon that fades out */}
      <motion.rect
        x="-300" y="70" width="1800" height="70"
        fill="url(#ground)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.6 }}
      />
      {/* horizon, drawn outward from the centre */}
      <motion.path d="M600 70 H-300" stroke="var(--accent)" strokeWidth="2" fill="none" {...draw(0.35)} />
      <motion.path d="M600 70 H1500" stroke="var(--accent)" strokeWidth="2" fill="none" {...draw(0.35)} />
      {ladder.map((l, i) => (
        <motion.g
          key={l.y}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.9 + i * 0.06 }}
        >
          <line x1={600 - l.w} x2={600 + l.w} y1={70 + l.y} y2={70 + l.y} stroke="var(--muted)" strokeWidth="1.25" strokeLinecap="round" />
          {l.label && (
            <>
              <text x={600 - l.w - 10} y={70 + l.y} textAnchor="end" dominantBaseline="middle" fontSize="10" fill="var(--muted)">{l.label}</text>
              <text x={600 + l.w + 10} y={70 + l.y} dominantBaseline="middle" fontSize="10" fill="var(--muted)">{l.label}</text>
            </>
          )}
        </motion.g>
      ))}
    </svg>
  );
}

function AircraftMark() {
  return (
    <svg viewBox="0 0 1200 140" className="absolute inset-0 block h-full w-[250%] -translate-x-[30%] md:w-[115%] md:-translate-x-[6.5%] overflow-visible">
      <motion.g
        stroke="var(--ink)" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease, delay: 1.0 }}
      >
        <path d="M528 70 H582 V80" />
        <path d="M672 70 H618 V80" />
      </motion.g>
      <circle cx="600" cy="70" r="4" fill="var(--ink)" />
    </svg>
  );
}
