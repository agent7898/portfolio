"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import { animate, stagger } from "animejs";
import { cn } from "@/lib/cn";
import { prefersReducedMotion } from "@/lib/timing";

type SplitTextProps = {
  children: string;
  className?: string;
  /** Wait for the intro curtain (or any other gate) before playing. */
  play?: boolean;
  delay?: number;
  by?: "chars" | "words";
  as?: "h1" | "h2" | "h3" | "p" | "span";
};

/**
 * Masked reveal: each unit rises out from behind a clipped line box.
 *
 * The splitting happens here in React rather than through anime's `text.split`
 * — that helper re-measures and rewrites the DOM to detect line breaks, which
 * double-renders inside a `clamp()`-sized heading. Splitting in the markup is
 * deterministic, survives SSR, and anime is left doing what it is good at:
 * the staggered motion.
 */
export default function SplitText({
  children,
  className,
  play = true,
  delay = 0,
  by = "chars",
  as: Tag = "span",
}: SplitTextProps) {
  const ref = useRef<HTMLElement>(null);
  const played = useRef(false);

  // Split into words first so wrapping still works, then into characters
  // inside each word — a word never breaks mid-glyph.
  const words = useMemo(() => children.split(" "), [children]);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;

    const units = root.querySelectorAll<HTMLElement>("[data-unit]");
    if (!units.length) return;

    // Hidden in a layout effect, not in markup: with JS disabled or still
    // loading, the text stays readable instead of being permanently invisible.
    if (!played.current && !prefersReducedMotion()) {
      units.forEach((el) => {
        el.style.transform = "translateY(110%)";
        el.style.opacity = "0";
      });
    }

    if (!play || played.current) return;
    played.current = true;

    if (prefersReducedMotion()) return;

    animate(units, {
      translateY: ["110%", "0%"],
      opacity: [0, 1],
      duration: 1300,
      delay: stagger(by === "chars" ? 20 : 60, { start: delay }),
      ease: "outExpo",
    });
  }, [play, delay, by]);

  return (
    <Tag
      ref={ref as React.Ref<never>}
      className={cn("block", className)}
      aria-label={children}
    >
      {/* The mask needs vertical slack or descenders clip — Playfair's `y` and
          `g` hang well below the baseline. The negative margin pulls the extra
          space back out of the line box so the rhythm is unchanged. */}
      <span
        aria-hidden
        className="block overflow-hidden pb-[0.42em] [margin-bottom:-0.42em]"
      >
        {words.map((word, wi) => (
          <span
            key={wi}
            data-unit={by === "words" ? "" : undefined}
            className="inline-block whitespace-nowrap will-change-transform"
          >
            {by === "chars"
              ? [...word].map((char, ci) => (
                  <span key={ci} data-unit="" className="inline-block will-change-transform">
                    {char}
                  </span>
                ))
              : word}
            {wi < words.length - 1 && <span className="inline-block">&nbsp;</span>}
          </span>
        ))}
      </span>
    </Tag>
  );
}
