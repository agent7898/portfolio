"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Marquee from "@/components/ui/Marquee";
import { about, marqueeItems } from "@/content/site";
import { useReveal } from "@/lib/reveal";

export default function About() {
  const stats = useReveal({ y: 30 }, { delay: 0.2 });
  const band = useReveal({}, { duration: 1.4 });

  return (
    <section id="about" className="relative z-10 px-6 py-32 md:px-12 md:py-44">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="01" label="Introduction" title={about.lead} />

        <div className="mt-16 grid gap-16 md:mt-24 md:grid-cols-[1.4fr_1fr] md:gap-24">
          <ScrollReveal className="text-lg font-light leading-[1.75] text-chrome-200 md:text-xl">
            {about.body}
          </ScrollReveal>

          <motion.dl
            {...stats}
            className="flex flex-col divide-y divide-white/[0.06] self-start border-t border-white/[0.06]"
          >
            {about.stats.map((stat) => (
              <div key={stat.label} className="flex items-baseline justify-between py-5">
                <dd className="font-serif text-4xl text-chrome md:text-5xl">{stat.value}</dd>
                <dt className="eyebrow text-right">{stat.label}</dt>
              </div>
            ))}
          </motion.dl>
        </div>
      </div>

      <motion.div {...band} className="mt-24 border-y border-white/[0.06] md:mt-36">
        {/* 80s keeps the band at its previous ~36px/s — the track got longer
            when Marquee went to four copies, and duration is per full cycle. */}
        <Marquee items={marqueeItems} duration={80} />
      </motion.div>
    </section>
  );
}
