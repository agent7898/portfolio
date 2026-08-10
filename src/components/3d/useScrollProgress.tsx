"use client";

import { useEffect, useRef } from "react";

/**
 * Page scroll as a 0..1 ref, read inside `useFrame` without triggering React
 * renders. Lenis scrolls the window for real, so the native value is correct
 * and there is no need to subscribe to the Lenis instance from inside the
 * canvas.
 */
export function useScrollProgress() {
  const progress = useRef(0);

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.current = max > 0 ? Math.min(1, window.scrollY / max) : 0;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return progress;
}
