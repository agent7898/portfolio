"use client";

import { cn } from "@/lib/cn";

/**
 * Seamless marquee. The track holds the children twice and translates -50%,
 * so the loop point lands exactly where it started — no visible jump.
 */
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
        {[0, 1].map((copy) => (
          <div key={copy} aria-hidden={copy === 1} className="flex items-center gap-10">
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
