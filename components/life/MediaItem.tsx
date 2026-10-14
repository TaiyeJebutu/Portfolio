"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { Media } from "@/content/life";
import { asset } from "@/lib/asset";

/**
 * A photo or a short silent clip. Clips play on a loop while on screen and pause
 * when scrolled away. With reduced motion on, they wait for a tap instead.
 */
export default function MediaItem({ media, className = "", sizes }: { media: Media; className?: string; sizes?: string }) {
  if (media.type === "image") {
    return (
      <figure className={`relative overflow-hidden rounded-2xl bg-surface ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={asset(media.src)} alt={media.alt} loading="lazy" decoding="async" sizes={sizes} className="h-full w-full object-cover" />
        <Caption text={media.caption} />
      </figure>
    );
  }
  return <Clip media={media} className={className} />;
}

function Clip({ media, className }: { media: Media; className: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v || reduce) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().then(() => setPlaying(true)).catch(() => {});
        else {
          v.pause();
          setPlaying(false);
        }
      },
      { threshold: 0.4 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [reduce]);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) v.play().then(() => setPlaying(true)).catch(() => {});
    else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <figure className={`relative overflow-hidden rounded-2xl bg-surface ${className}`}>
      <video
        ref={ref}
        src={asset(media.src)}
        poster={media.poster ? asset(media.poster) : undefined}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={media.alt}
        className="h-full w-full object-cover"
      />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? `Pause clip: ${media.alt}` : `Play clip: ${media.alt}`}
        className="absolute bottom-3 right-3 grid h-9 w-9 place-items-center rounded-full bg-bg/80 text-ink backdrop-blur transition-colors hover:bg-bg"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
          {playing ? (
            <>
              <rect x="2.5" y="2" width="3" height="10" rx="1" />
              <rect x="8.5" y="2" width="3" height="10" rx="1" />
            </>
          ) : (
            <path d="M3.5 2.2v9.6a.6.6 0 0 0 .9.5l7.6-4.8a.6.6 0 0 0 0-1L4.4 1.7a.6.6 0 0 0-.9.5Z" />
          )}
        </svg>
      </button>
      <Caption text={media.caption} roomForButton />
    </figure>
  );
}

/** Your own line about the moment, laid over the bottom of the photo or clip. */
function Caption({ text, roomForButton = false }: { text?: string; roomForButton?: boolean }) {
  if (!text) return null;
  return (
    <figcaption
      className={`pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-4 pb-3 pt-10 type-small text-white ${
        roomForButton ? "pr-14" : ""
      }`}
    >
      {text}
    </figcaption>
  );
}
