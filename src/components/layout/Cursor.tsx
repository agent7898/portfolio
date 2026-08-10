"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/timing";

/**
 * "Cursor: small glowing white dot" — design/animations.md.
 *
 * The dot tracks the pointer almost exactly; the ring lags behind it, which is
 * what makes the pair feel weighted rather than stuck to the mouse. Anything
 * marked `data-cursor="hover"` swells the ring on approach.
 */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Touch devices have no pointer to replace, and a stuck dot looks broken.
    const fine = window.matchMedia("(pointer: fine)");
    if (!fine.matches || prefersReducedMotion()) return;

    document.documentElement.classList.add("has-custom-cursor");

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const dot = { ...target };
    const ring = { ...target };
    let ringScale = 1;
    let ringScaleTarget = 1;
    let frame = 0;

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };

    const onOver = (e: PointerEvent) => {
      const el = (e.target as HTMLElement)?.closest?.(
        '[data-cursor="hover"], a, button, input, textarea'
      );
      ringScaleTarget = el ? 2.2 : 1;
    };

    const onDown = () => (ringScaleTarget *= 0.8);
    const onUp = () => (ringScaleTarget = Math.max(1, ringScaleTarget / 0.8));

    const lerp = (a: number, b: number, n: number) => a + (b - a) * n;

    const render = () => {
      dot.x = lerp(dot.x, target.x, 0.55);
      dot.y = lerp(dot.y, target.y, 0.55);
      ring.x = lerp(ring.x, target.x, 0.12);
      ring.y = lerp(ring.y, target.y, 0.12);
      ringScale = lerp(ringScale, ringScaleTarget, 0.12);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dot.x}px, ${dot.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%) scale(${ringScale})`;
      }
      frame = requestAnimationFrame(render);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[90] hidden md:block">
      {/* Parked offscreen until the effect starts driving them, so a device
          without a fine pointer never shows a stranded dot in the corner. */}
      <div
        ref={dotRef}
        className="absolute left-0 top-0 h-[5px] w-[5px] rounded-full bg-white"
        style={{
          transform: "translate3d(-100px, -100px, 0)",
          boxShadow: "0 0 12px 2px rgba(255,255,255,0.55)",
        }}
      />
      <div
        ref={ringRef}
        className="absolute left-0 top-0 h-8 w-8 rounded-full border border-white/25"
        style={{ transform: "translate3d(-100px, -100px, 0)" }}
      />
    </div>
  );
}
