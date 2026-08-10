"use client";

import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Float, Lightformer, PerspectiveCamera, Preload } from "@react-three/drei";
import * as THREE from "three";
import ChromeKnot from "./ChromeKnot";
import Stars from "./Stars";
import CameraRig from "./CameraRig";
import { prefersReducedMotion } from "@/lib/timing";

/**
 * Fixed full-viewport backdrop. Every DOM section on the page must carry
 * `relative z-10` to sit above this, and nothing here takes pointer events.
 */
export default function Scene() {
  // Read once, in a lazy initialiser rather than an effect: this component is
  // `ssr: false`, so there is no server render to mismatch against.
  const [reduced] = useState(prefersReducedMotion);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 h-full w-full">
      <Canvas
        // "demand" paints one frame and then stops, so a reduced-motion
        // visitor gets the composition without the perpetual rotation.
        frameloop={reduced ? "demand" : "always"}
        dpr={[1, 1.75]}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
        }}
        // r3f v9 clears to transparent; the page's own black shows through.
        style={{ background: "transparent" }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={40} />
        <CameraRig />

        <Suspense fallback={null}>
          {/*
            Hand-built environment. Three white rect lightformers on a black
            world give the chrome long clean highlights with dark falloff
            between them — the Vision Pro / Silver Surfer read. An HDRI preset
            would wash colour across the metal.
          */}
          <Environment resolution={256}>
            <color attach="background" args={["#000000"]} />
            <Lightformer
              form="rect"
              intensity={3.4}
              position={[0, 4.5, -6]}
              scale={[12, 5, 1]}
              color="#ffffff"
            />
            <Lightformer
              form="rect"
              intensity={1.6}
              position={[-7, -1, 3]}
              rotation={[0, Math.PI / 2, 0]}
              scale={[10, 6, 1]}
              color="#ffffff"
            />
            {/* The brief's "occasional blue reflections", kept to one rim. */}
            <Lightformer
              form="rect"
              intensity={1.1}
              position={[7, 1.5, 2]}
              rotation={[0, -Math.PI / 2, 0]}
              scale={[8, 5, 1]}
              color="#9db4d8"
            />
            <Lightformer
              form="circle"
              intensity={1.4}
              position={[0, -5, 2]}
              scale={6}
              color="#ffffff"
            />
          </Environment>

          <ambientLight intensity={0.12} />

          <Float speed={1.1} rotationIntensity={0.25} floatIntensity={0.7}>
            <ChromeKnot />
          </Float>

          <Stars />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
