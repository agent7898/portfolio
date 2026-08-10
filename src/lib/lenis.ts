import type Lenis from "lenis";

/**
 * Lenis owns the scroll position, so anchor navigation has to go through it —
 * a native `scrollIntoView` fights the inertia loop and lands in the wrong place.
 * SmoothScrolling registers the instance here; Nav and the scroll cue consume it.
 */
let instance: Lenis | null = null;

export function setLenis(lenis: Lenis | null) {
  instance = lenis;
}

export function getLenis() {
  return instance;
}

export function scrollToSection(hash: string) {
  const target = document.querySelector(hash);
  if (!target) return;

  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(target as HTMLElement, { offset: 0, duration: 1.6 });
  } else {
    target.scrollIntoView({ behavior: "smooth" });
  }
}
