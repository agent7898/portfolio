"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { animate, createTimeline } from "animejs";
import { getLenis } from "@/lib/lenis";
import { PRELOAD_DURATION, prefersReducedMotion } from "@/lib/timing";

/**
 * Intro curtain: a count to 100 behind a filling hairline, then the black
 * lifts away. Hero motion waits on `useAppReady()` rather than a hardcoded
 * delay, so the two stay in sync if the timing is ever retuned.
 */
const ReadyContext = createContext(false);

export function useAppReady() {
  return useContext(ReadyContext);
}

export function PreloadProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const countEl = countRef.current;
    const bar = barRef.current;
    if (!root || !countEl || !bar) return;

    // Returning to the page mid-session shouldn't replay the whole intro, and
    // reduced-motion users shouldn't sit through it at all. Rather than set
    // state straight out of the effect, both cases run the same timeline at
    // ~zero duration so `ready` is always flipped from anime's onComplete.
    const skip =
      sessionStorage.getItem("intro-seen") === "1" || prefersReducedMotion();
    const scale = skip ? 0.0005 : 1;
    const total = PRELOAD_DURATION * scale;

    const lenis = getLenis();
    if (!skip) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    }

    const counter = { value: 0 };
    const numbers = animate(counter, {
      value: 100,
      duration: total * 0.8,
      ease: "inOutQuad",
      onUpdate: () => {
        countEl.textContent = String(Math.round(counter.value)).padStart(3, "0");
      },
    });

    const tl = createTimeline({
      defaults: { ease: "outExpo" },
      onComplete: () => {
        sessionStorage.setItem("intro-seen", "1");
        document.body.style.overflow = "";
        lenis?.start();
        setReady(true);
      },
    });

    tl.add(bar, { scaleX: [0, 1], duration: total * 0.8, ease: "inOutQuad" }, 0)
      .add([countEl, bar.parentElement!], { opacity: [1, 0], duration: total * 0.25 }, total * 0.82)
      .add(root, { opacity: [1, 0], duration: total * 0.45, ease: "inOutQuad" }, total * 0.9);

    return () => {
      numbers.pause();
      tl.pause();
      document.body.style.overflow = "";
      lenis?.start();
    };
  }, []);

  return (
    <ReadyContext.Provider value={ready}>
      {/* Rendered on the server too, so the curtain is already covering the
          page on first paint instead of flashing in after hydration. */}
      {!ready && (
        <div
          ref={rootRef}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
        >
          <span
            ref={countRef}
            className="font-display text-6xl tabular-nums tracking-tight text-chrome md:text-8xl"
          >
            000
          </span>
          <div className="mt-8 h-px w-40 overflow-hidden bg-white/10 md:w-64">
            <div ref={barRef} className="h-full w-full origin-left scale-x-0 bg-white/70" />
          </div>
        </div>
      )}
      {children}
    </ReadyContext.Provider>
  );
}
