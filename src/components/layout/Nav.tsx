"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { scrollToSection } from "@/lib/lenis";
import { EASE_OUT } from "@/lib/timing";
import { useAppReady } from "./Preloader";
import { cn } from "@/lib/cn";
import { profile } from "@/content/site";

const LINKS = [
  { label: "Index", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Education", href: "#education" },
  { label: "Stack", href: "#stack" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const ready = useAppReady();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    scrollToSection(href);
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={ready ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, ease: EASE_OUT, delay: 0.2 }}
      className={cn(
        "fixed inset-x-0 top-0 z-[70] transition-colors duration-500",
        scrolled && "border-b border-white/[0.06] bg-black/40 backdrop-blur-xl"
      )}
    >
      <nav className="mx-auto flex max-w-[100rem] items-center justify-between px-6 py-5 md:px-12">
        <a
          href="#top"
          onClick={(e) => go(e, "#top")}
          className="group flex items-center gap-3"
          data-cursor="hover"
          aria-label="Back to top"
        >
          <span className="relative block h-8 w-8 overflow-hidden rounded-full ring-1 ring-white/15 transition-all duration-500 group-hover:ring-white/40 group-hover:shadow-[0_0_16px_rgba(255,255,255,0.25)]">
            <Image
              src="/silver-surfer.webp"
              alt=""
              fill
              sizes="32px"
              priority
              className="object-cover"
            />
          </span>
          <span className="font-display text-sm tracking-[0.2em] text-white/90 transition-colors group-hover:text-white">
            GCLC
          </span>
        </a>

        <ul className="hidden items-center gap-9 md:flex">
          {LINKS.map((link, i) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => go(e, link.href)}
                data-cursor="hover"
                className="group relative font-display text-xs uppercase tracking-[0.22em] text-chrome-400 transition-colors duration-300 hover:text-white"
              >
                <span className="mr-2 text-[0.625rem] text-chrome-600">
                  0{i + 1}
                </span>
                {link.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-white/50 transition-all duration-500 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <a
          href={profile.resume}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="hover"
          className="group relative overflow-hidden rounded-full border border-white/15 px-5 py-2 font-display text-[0.6875rem] uppercase tracking-[0.2em] text-white/80 transition-colors duration-500 hover:border-white/40 hover:text-white"
        >
          <span className="relative z-10">Résumé</span>
          <span className="absolute inset-0 -translate-x-full bg-white/10 transition-transform duration-700 ease-out group-hover:translate-x-0" />
        </a>
      </nav>
    </motion.header>
  );
}
