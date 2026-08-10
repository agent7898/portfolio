/** Shared motion constants, in milliseconds/seconds. */

/** How long the intro curtain holds before it lifts. */
export const PRELOAD_DURATION = 2000;

/** Everything slow and floating — the brief's words. Nothing bouncy. */
export const EASE_OUT = [0.16, 1, 0.3, 1] as const;
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
