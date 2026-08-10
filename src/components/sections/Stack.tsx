"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { stack } from "@/content/site";
import { useReveal } from "@/lib/reveal";

export default function Stack() {
  const groups = Object.entries(stack) as [string, readonly string[]][];

  return (
    <section id="stack" className="relative z-10 px-6 py-32 md:px-12 md:py-44">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="04" label="Capabilities" title="The tools I reach for." />

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.04] md:mt-24 md:grid-cols-2">
          {groups.map(([group, items], gi) => (
            <StackGroup key={group} group={group} items={items} index={gi} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StackGroup({
  group,
  items,
  index,
}: {
  group: string;
  items: readonly string[];
  index: number;
}) {
  const reveal = useReveal({ y: 30 }, { duration: 0.9, delay: index * 0.08 });

  return (
    <motion.div
      {...reveal}
      className="group relative bg-black p-8 transition-colors duration-700 hover:bg-white/[0.015] md:p-10"
    >
      <div className="mb-7 flex items-center gap-3">
        <span className="eyebrow text-chrome-500">0{index + 1}</span>
        <h3 className="eyebrow text-chrome-200">{group}</h3>
      </div>

      <ul className="flex flex-wrap gap-x-6 gap-y-3">
        {items.map((item) => (
          <li
            key={item}
            className="font-display text-sm text-chrome-400 transition-colors duration-500 hover:text-white"
          >
            {item}
          </li>
        ))}
      </ul>

      {/* Top-edge highlight that lights up on hover. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 ease-out group-hover:scale-x-100"
      />
    </motion.div>
  );
}
