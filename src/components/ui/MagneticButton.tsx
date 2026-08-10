"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/cn";

/**
 * Magnetic hover: the control drifts toward the cursor while it is nearby and
 * springs back on exit. `strength` is the fraction of the offset it follows —
 * past ~0.4 it stops feeling like weight and starts feeling like a glitch.
 */
export default function MagneticButton({
  children,
  className,
  strength = 0.28,
  as = "button",
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  as?: "button" | "a";
} & React.ComponentPropsWithoutRef<"button"> &
  React.ComponentPropsWithoutRef<"a">) {
  const ref = useRef<HTMLDivElement>(null);
  const springs = { stiffness: 160, damping: 18, mass: 0.5 };
  const x = useSpring(useMotionValue(0), springs);
  const y = useSpring(useMotionValue(0), springs);

  const onMove = (e: React.PointerEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const Tag = as === "a" ? motion.a : motion.button;

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className="inline-flex"
      data-cursor="hover"
    >
      <Tag
        style={{ x, y }}
        className={cn(
          "group relative inline-flex items-center justify-center overflow-hidden rounded-full",
          "border border-white/15 px-8 py-4 font-display text-xs uppercase tracking-[0.22em]",
          "text-white/85 transition-colors duration-500 hover:border-white/40 hover:text-white",
          "disabled:cursor-not-allowed disabled:opacity-40",
          className
        )}
        {...(props as Record<string, unknown>)}
      >
        {/* Glow on hover — the brief's only sanctioned button effect. */}
        <span
          aria-hidden
          className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(120% 120% at 50% 120%, rgba(255,255,255,0.22), transparent 60%)",
          }}
        />
        <span className="relative z-10 flex items-center gap-3">{children}</span>
      </Tag>
    </div>
  );
}
