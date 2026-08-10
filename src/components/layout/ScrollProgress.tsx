"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Hairline progress rail pinned to the top of the viewport. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="pointer-events-none fixed inset-x-0 top-0 z-[80] h-px origin-left bg-gradient-to-r from-transparent via-white/70 to-transparent"
    />
  );
}
