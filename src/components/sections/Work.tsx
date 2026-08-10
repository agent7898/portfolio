"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { projects, type Project } from "@/content/site";
import { useReveal } from "@/lib/reveal";

export default function Work() {
  return (
    <section id="work" className="relative z-10 px-6 py-32 md:px-12 md:py-44">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="02" label="Selected Work" title="Things I have built." />

        <div className="mt-16 flex flex-col gap-8 md:mt-24">
          {projects.map((project, i) => (
            <ProjectCard key={project.index} project={project} delay={i * 0.12} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, delay }: { project: Project; delay: number }) {
  const reveal = useReveal({ y: 60 }, { duration: 1.1, delay });

  return (
    <motion.div {...reveal}>
      <SpotlightCard className="p-8 md:p-12">
        {/* Oversized index sits behind the content as a watermark. */}
        <span
          aria-hidden
          className="pointer-events-none absolute -top-4 right-2 select-none font-serif text-[6rem] leading-none text-white/[0.04] transition-transform duration-1000 ease-out group-hover:scale-110 md:text-[10rem]"
        >
          {project.index}
        </span>

        <div className="relative grid gap-10 md:grid-cols-[1fr_1.15fr] md:gap-16">
          <div>
            <div className="mb-5 flex flex-wrap items-center gap-3">
              {/* Per-project status — these are not both shipped products. */}
              <span className="rounded-full border border-white/[0.12] px-3 py-1 font-display text-[0.5625rem] uppercase tracking-[0.2em] text-chrome-300">
                {project.status}
              </span>
              <span className="h-px w-6 bg-white/15" />
              <span className="eyebrow">{project.role}</span>
            </div>

            <h3 className="font-serif text-3xl leading-tight text-white md:text-5xl">
              {project.title}
            </h3>

            <p className="mt-6 max-w-md text-[0.9375rem] font-light leading-relaxed text-chrome-300">
              {project.summary}
            </p>

            <ul className="mt-8 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full border border-white/[0.09] px-3 py-1.5 font-display text-[0.625rem] uppercase tracking-[0.16em] text-chrome-300 transition-colors duration-500 hover:border-white/25 hover:text-white"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>

          <ul className="flex flex-col gap-px self-center">
            {project.contributions.map((item, i) => (
              <li
                key={item}
                className="group/row flex gap-5 border-t border-white/[0.06] py-4 last:border-b"
              >
                <span className="mt-1 font-display text-[0.625rem] tabular-nums text-chrome-600">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm font-light leading-relaxed text-chrome-300 transition-colors duration-500 group-hover/row:text-chrome-100">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </SpotlightCard>
    </motion.div>
  );
}
