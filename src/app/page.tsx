"use client";

import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Work from "@/components/sections/Work";
import Education from "@/components/sections/Education";
import Stack from "@/components/sections/Stack";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

// react-three-fiber cannot server-render; the canvas is browser-only.
const Scene = dynamic(() => import("@/components/3d/Scene"), { ssr: false });

export default function Home() {
  return (
    <>
      <Scene />

      {/* Every section below is `relative z-10` — the canvas sits at z-0. */}
      <main className="relative">
        <Hero />
        <About />
        <Work />
        <Education />
        <Stack />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
