"use client";

import { cn } from "@/lib/cn";

/**
 * Seamless marquee. The track repeats the children and translates -50%, so the
 * loop point lands exactly where it started — no visible jump.
 *
 * COPIES must stay even: -50% is then a whole number of copies, which is what
 * makes the seam invisible. It is 4 rather than 2 because the untranslated half
 * of the track has to cover the viewport on its own — with a short list, two
 * copies leave a gap at the end of the cycle on wide screens. Measured: one
 * copy of `marqueeItems` is ~1440px, so half of a 4-copy track covers ~2880px.
 * Shortening the list further means checking this again.
 */
const COPIES = [0, 1, 2, 3];
export default function Marquee({
  items,
  duration = 45,
  reverse = false,
  className,
}: {
  items: string[];
  duration?: number;
  reverse?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("mask-edges relative overflow-hidden py-4", className)}>
      <div
        className="animate-marquee flex w-max items-center gap-10"
        style={{
          ["--marquee-duration" as string]: `${duration}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {COPIES.map((copy) => (
          <div key={copy} aria-hidden={copy > 0} className="flex items-center gap-10">
            {items.map((item) => (
              <span key={item} className="flex items-center gap-10 whitespace-nowrap">
                <span className="font-display text-sm uppercase tracking-[0.24em] text-chrome-300">
                  {item}
                </span>
                <span className="h-1 w-1 rounded-full bg-chrome-600" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
