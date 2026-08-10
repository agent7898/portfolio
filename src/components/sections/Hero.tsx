"use client";

import { motion } from "framer-motion";
import { useAppReady } from "@/components/layout/Preloader";
import SplitText from "@/components/ui/SplitText";
import { scrollToSection } from "@/lib/lenis";
import { EASE_OUT } from "@/lib/timing";
import { profile } from "@/content/site";

export default function Hero() {
  const ready = useAppReady();

  return (
    <section
      id="top"
      className="relative z-10 flex min-h-svh flex-col items-center justify-center px-6 text-center"
    >
      {/* Scrim: keeps the wordmark legible where the chrome object passes
          behind it, without dimming the object elsewhere on the page. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 h-[60vh] -translate-y-[38%]"
        style={{
          background:
            "radial-gradient(ellipse 55% 50% at 50% 55%, rgba(0,0,0,0.82), transparent 72%)",
        }}
      />

      {/* Upper band is left clear for the chrome object to crown the wordmark. */}
      <div aria-hidden className="h-[18vh] shrink-0 md:h-[24vh]" />

      <motion.p
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ duration: 1.2, ease: EASE_OUT, delay: 0.3 }}
        className="eyebrow relative mb-8"
      >
        Portfolio — {new Date().getFullYear()}
      </motion.p>

      <h1 className="relative max-w-5xl font-serif text-[clamp(2.75rem,9vw,7.5rem)] leading-[0.92] tracking-[-0.03em]">
        <SplitText
          as="span"
          play={ready}
          delay={500}
          className="chrome-split chrome-split-sheen"
        >
          GC Likith
        </SplitText>
        <SplitText as="span" play={ready} delay={760} className="chrome-split">
          Chowdary
        </SplitText>
      </h1>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={ready ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.2, ease: EASE_OUT, delay: 1.5 }}
        className="relative mt-12 flex flex-col items-center gap-5 md:mt-14"
      >
        <div className="hairline w-40" />
        <p className="font-display text-[0.6875rem] uppercase tracking-[0.42em] text-chrome-300 md:text-xs">
          {profile.role} <span className="text-chrome-600">/</span> {profile.location}
        </p>
      </motion.div>

      {/* Scroll cue */}
      <motion.button
        type="button"
        onClick={() => scrollToSection("#about")}
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ duration: 1.2, delay: 2.1 }}
        data-cursor="hover"
        aria-label="Scroll to introduction"
        className="group absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3"
      >
        <span className="eyebrow text-[0.5625rem] text-chrome-500 transition-colors group-hover:text-chrome-200">
          Scroll
        </span>
        <span className="relative block h-14 w-px overflow-hidden bg-white/10">
          <motion.span
            className="absolute inset-x-0 top-0 block h-5 bg-white/70"
            animate={{ y: ["-100%", "280%"] }}
            transition={{ duration: 2.6, ease: "easeInOut", repeat: Infinity }}
          />
        </span>
      </motion.button>
    </section>
  );
}
