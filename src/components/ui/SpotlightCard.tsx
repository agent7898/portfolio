"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/cn";

/**
 * Card that responds to the pointer three ways at once: a soft light follows
 * the cursor across the surface, the border brightens where the light is, and
 * the whole plane tilts a couple of degrees toward it.
 *
 * The tilt is deliberately tiny (5°) and spring-damped — the brief rules out
 * anything bouncy, and a big parallax tilt reads as a template.
 */
export default function SpotlightCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  // Pointer position in card space, for the spotlight gradient.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  // Normalised -0.5..0.5, for the tilt.
  const nx = useMotionValue(0);
  const ny = useMotionValue(0);
  const springs = { stiffness: 140, damping: 20, mass: 0.6 };
  const rotateX = useSpring(useTransform(ny, [-0.5, 0.5], [5, -5]), springs);
  const rotateY = useSpring(useTransform(nx, [-0.5, 0.5], [-5, 5]), springs);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mx.set(x);
    my.set(y);
    nx.set(x / rect.width - 0.5);
    ny.set(y / rect.height - 0.5);
  };

  const onLeave = () => {
    setHovered(false);
    nx.set(0);
    ny.set(0);
  };

  const spotlight = useTransform(
    [mx, my],
    ([x, y]: number[]) =>
      `radial-gradient(340px circle at ${x}px ${y}px, rgba(255,255,255,0.10), transparent 65%)`
  );

  const borderLight = useTransform(
    [mx, my],
    ([x, y]: number[]) =>
      `radial-gradient(240px circle at ${x}px ${y}px, rgba(255,255,255,0.55), transparent 60%)`
  );

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={onLeave}
      style={{ rotateX, rotateY, transformPerspective: 1200, transformStyle: "preserve-3d" }}
      className={cn("group relative isolate rounded-2xl", className)}
    >
      {/* Lit border, in three layers: a bright pointer-tracking wash, an
          opaque panel inset by 1px so only that rim of the wash shows, then
          the card's own tint on top — the tint has to sit above the panel or
          the panel's black swallows it. */}
      <motion.span
        aria-hidden
        style={{ background: borderLight, opacity: hovered ? 1 : 0 }}
        className="pointer-events-none absolute inset-0 -z-10 rounded-2xl transition-opacity duration-500"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-px -z-10 rounded-[15px] bg-black"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-px rounded-[15px] bg-white/[0.015] transition-colors duration-500 group-hover:bg-white/[0.035]"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/[0.07]"
      />

      {/* Travelling spotlight. */}
      <motion.span
        aria-hidden
        style={{ background: spotlight, opacity: hovered ? 1 : 0 }}
        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-500"
      />

      <div className="relative" style={{ transform: "translateZ(40px)" }}>
        {children}
      </div>
    </motion.div>
  );
}
