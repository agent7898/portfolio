"use client";

import { MotionConfig } from "framer-motion";
import SmoothScrolling from "./SmoothScrolling";
import { PreloadProvider } from "./Preloader";
import Cursor from "./Cursor";
import ScrollProgress from "./ScrollProgress";
import Grain from "./Grain";
import Nav from "./Nav";

/**
 * Single client boundary for everything that has to run in the browser —
 * scroll engine, intro curtain, cursor, chrome. Keeps the root layout a
 * server component with one import instead of six.
 */
export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    // `reducedMotion="user"` makes framer-motion drop transform animations for
    // anyone who asked the OS for less motion, keeping opacity fades. The CSS
    // block in globals.css only covers CSS animations, not these.
    <MotionConfig reducedMotion="user">
      <SmoothScrolling>
        <PreloadProvider>
          <Grain />
          <Cursor />
          <ScrollProgress />
          <Nav />
          {children}
        </PreloadProvider>
      </SmoothScrolling>
    </MotionConfig>
  );
}
