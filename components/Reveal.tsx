"use client";

import { motion } from "framer-motion";

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

export function Section({
  id,
  title,
  intro,
  children,
}: {
  id: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-t border-line py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal className="grid gap-6 md:grid-cols-12">
          <h2 id={`${id}-title`} className="type-h2 md:col-span-5">
            {title}
          </h2>
          {intro && <p className="type-lead max-w-[38ch] text-muted md:col-span-6 md:col-start-7 md:pt-2">{intro}</p>}
        </Reveal>
        <div className="mt-14 md:mt-20">{children}</div>
      </div>
    </section>
  );
}
