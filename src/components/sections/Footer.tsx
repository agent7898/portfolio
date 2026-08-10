"use client";

import { motion } from "framer-motion";
import { scrollToSection } from "@/lib/lenis";
import { profile } from "@/content/site";
import { useReveal } from "@/lib/reveal";

export default function Footer() {
  const credit = useReveal();

  return (
    <footer className="relative z-10 border-t border-white/[0.06] px-6 py-12 md:px-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <motion.p
          {...credit}
          className="font-display text-[0.6875rem] uppercase tracking-[0.22em] text-chrome-600"
        >
          © {new Date().getFullYear()} {profile.name}
        </motion.p>

        <div className="flex flex-wrap items-center gap-6 md:gap-8">
          {[
            { label: "GitHub", href: profile.github },
            { label: "LinkedIn", href: profile.linkedin },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              className="font-display text-[0.6875rem] uppercase tracking-[0.22em] text-chrome-500 transition-colors duration-500 hover:text-white"
            >
              {link.label}
            </a>
          ))}
          <a
            href={`mailto:${profile.email}`}
            data-cursor="hover"
            className="font-display text-[0.6875rem] uppercase tracking-[0.22em] text-chrome-500 transition-colors duration-500 hover:text-white"
          >
            Email
          </a>
          <button
            type="button"
            onClick={() => scrollToSection("#top")}
            data-cursor="hover"
            className="group flex items-center gap-2 font-display text-[0.6875rem] uppercase tracking-[0.22em] text-chrome-500 transition-colors duration-500 hover:text-white"
          >
            Back to top
            <span
              aria-hidden
              className="inline-block transition-transform duration-500 group-hover:-translate-y-1"
            >
              ↑
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
