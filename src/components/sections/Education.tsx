"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { education, type Education as EducationEntry } from "@/content/site";
import { useReveal } from "@/lib/reveal";

export default function Education() {
  return (
    <section id="education" className="relative z-10 px-6 py-32 md:px-12 md:py-44">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="03" label="Education" title="Where the fundamentals came from." />

        <ol className="mt-16 md:mt-24">
          {education.map((entry, i) => (
            <Entry key={entry.index} entry={entry} delay={i * 0.12} />
          ))}
        </ol>
      </div>
    </section>
  );
}

function Entry({ entry, delay }: { entry: EducationEntry; delay: number }) {
  const reveal = useReveal({ y: 40 }, { delay });

  return (
    <motion.li
      {...reveal}
      className="group grid gap-6 border-t border-white/[0.06] py-10 last:border-b md:grid-cols-[9rem_1fr] md:gap-12 md:py-12"
    >
      {/* Timeline rail: the marker brightens as the row is hovered. */}
      <div className="flex items-start gap-4">
        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-chrome-600 transition-all duration-700 group-hover:bg-white group-hover:shadow-[0_0_10px_2px_rgba(255,255,255,0.45)]" />
        <span className="eyebrow whitespace-nowrap">{entry.period}</span>
      </div>

      <div>
        <h3 className="font-serif text-2xl leading-snug text-white md:text-3xl">
          {entry.qualification}
        </h3>
        <p className="mt-3 font-display text-sm text-chrome-300">{entry.institution}</p>
        <p className="mt-4 text-sm font-light text-chrome-400">{entry.detail}</p>

        {entry.coursework && (
          <ul className="mt-7 flex flex-wrap gap-2">
            {entry.coursework.map((course) => (
              <li
                key={course}
                className="rounded-full border border-white/[0.09] px-3 py-1.5 font-display text-[0.625rem] uppercase tracking-[0.16em] text-chrome-400 transition-colors duration-500 hover:border-white/25 hover:text-white"
              >
                {course}
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.li>
  );
}
