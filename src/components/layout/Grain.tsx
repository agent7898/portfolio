"use client";

/**
 * Film grain + vignette. On a pure-black page, flat areas band badly on cheap
 * panels; a few percent of noise breaks the gradient up and is most of what
 * separates "premium" from "black div" at zero runtime cost.
 */
export default function Grain() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[60] opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[55]"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 50% 45%, transparent 35%, rgba(0,0,0,0.55) 78%, #000 100%)",
        }}
      />
    </>
  );
}
