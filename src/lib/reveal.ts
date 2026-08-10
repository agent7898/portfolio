"use client";

import { useReducedMotion, type MotionProps } from "framer-motion";
import { EASE_OUT } from "./timing";

const VIEWPORT = { once: true, margin: "-100px" } as const;

type From = {
  y?: number;
  x?: number;
  scale?: number;
};

/**
 * Standard scroll reveal, in one place.
 *
 * Under `prefers-reduced-motion` it returns no props at all, so the element
 * renders plainly visible. That matters beyond taste: a reveal built on
 * `initial={{ opacity: 0 }}` hides its content until an IntersectionObserver
 * fires, so if the observer never runs the section is simply blank. Content
 * should never be gated behind an animation.
 */
export function useReveal(from: From = {}, opts: { delay?: number; duration?: number } = {}) {
  const reduced = useReducedMotion();
  if (reduced) return {} as MotionProps;

  const { y = 0, x = 0, scale } = from;
  const { delay = 0, duration = 1 } = opts;

  return {
    initial: { opacity: 0, y, x, ...(scale !== undefined && { scale }) },
    whileInView: { opacity: 1, y: 0, x: 0, ...(scale !== undefined && { scale: 1 }) },
    viewport: VIEWPORT,
    transition: { duration, ease: EASE_OUT, delay },
  } satisfies MotionProps;
}
