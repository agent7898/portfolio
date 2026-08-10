"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import ContactForm from "@/components/ui/ContactForm";
import { profile } from "@/content/site";
import { useReveal } from "@/lib/reveal";

export default function Contact() {
  const details = useReveal({ y: 30 });
  const form = useReveal({ y: 40 }, { duration: 1.1, delay: 0.15 });

  return (
    <section id="contact" className="relative z-10 px-6 py-32 md:px-12 md:py-44">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="05"
          label="Contact"
          title="Open to roles, freelance work, and interesting problems."
        />

        <div className="mt-16 grid gap-14 md:mt-24 md:grid-cols-[1fr_1.1fr] md:gap-24">
          <motion.div {...details} className="flex flex-col gap-10">
            {/* A direct mail link, so there is always a path that does not
                depend on the form's backend. */}
            <div>
              <p className="eyebrow mb-4">Direct</p>
              <a
                href={`mailto:${profile.email}`}
                data-cursor="hover"
                className="group inline-flex items-baseline gap-3 font-serif text-2xl text-white transition-colors md:text-3xl"
              >
                <span className="bg-gradient-to-r from-white to-white bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-700 group-hover:bg-[length:100%_1px]">
                  {profile.email}
                </span>
              </a>
            </div>

            <div className="hairline max-w-xs" />

            <div>
              <p className="eyebrow mb-4">Elsewhere</p>
              <ul className="flex flex-col gap-3">
                {[
                  { label: "GitHub", href: profile.github },
                  { label: "LinkedIn", href: profile.linkedin },
                  { label: "Résumé", href: profile.resume },
                ].map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="hover"
                      className="group flex w-fit items-center gap-3 font-display text-sm text-chrome-400 transition-colors duration-500 hover:text-white"
                    >
                      <span className="h-px w-5 bg-white/20 transition-all duration-500 group-hover:w-9 group-hover:bg-white/60" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div {...form}>
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
