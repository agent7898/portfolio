"use client";

import { motion } from "framer-motion";
import { useReveal } from "@/lib/reveal";
import { cn } from "@/lib/cn";

/**
 * Editorial section header: index, label, hairline, then the display line —
 * each on its own beat so the eye lands in reading order.
 */
export default function SectionHeading({
  index,
  label,
  title,
  align = "left",
  className,
}: {
  index: string;
  label: string;
  title: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  const eyebrow = useReveal({ y: 14 }, { duration: 0.9 });
  const heading = useReveal({ y: 26 }, { duration: 1.1, delay: 0.1 });
  const rule = useReveal({}, { duration: 1.4, delay: 0.2 });

  return (
    <div
      className={cn(
        "flex flex-col gap-6",
        align === "center" && "items-center text-center",
        className
      )}
    >
      <motion.div {...eyebrow} className="flex items-center gap-4">
        <span className="eyebrow text-chrome-500">{index}</span>
        <span className="h-px w-8 bg-white/15" />
        <span className="eyebrow">{label}</span>
      </motion.div>

      <motion.h2
        {...heading}
        className="max-w-3xl font-serif text-4xl leading-[1.05] tracking-tight text-white md:text-6xl"
      >
        {title}
      </motion.h2>

      <motion.div
        {...rule}
        className={cn(
          "hairline w-full max-w-md origin-left",
          align === "center" && "origin-center"
        )}
      />
    </div>
  );
}
