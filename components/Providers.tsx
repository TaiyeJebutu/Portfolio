"use client";

import { MotionConfig } from "framer-motion";

export default function Providers({ children }: { children: React.ReactNode }) {
  // Honour the visitor's reduced-motion setting everywhere.
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
