"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { createRng } from "@/lib/rng";

/**
 * "Only tiny white stars. No nebula. No galaxy. No colourful planets."
 *
 * Two shells at different radii rotating at different rates give parallax
 * depth without any additional geometry.
 */
export default function Stars({ count = 2600 }: { count?: number }) {
  const nearRef = useRef<THREE.Points>(null);
  const farRef = useRef<THREE.Points>(null);

  const near = useMemo(() => shell(Math.floor(count * 0.35), 14, 26, 1), [count]);
  const far = useMemo(() => shell(Math.floor(count * 0.65), 30, 60, 2), [count]);

  useFrame((_, delta) => {
    if (nearRef.current) {
      nearRef.current.rotation.y -= delta * 0.012;
      nearRef.current.rotation.x -= delta * 0.005;
    }
    if (farRef.current) {
      farRef.current.rotation.y -= delta * 0.004;
    }
  });

  return (
    <>
      <points ref={nearRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[near, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.055}
          color="#ffffff"
          transparent
          opacity={0.85}
          sizeAttenuation
          depthWrite={false}
        />
      </points>

      <points ref={farRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[far, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.035}
          color="#ffffff"
          transparent
          opacity={0.45}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
    </>
  );
}

/** Uniform point distribution in a spherical shell, from a fixed seed. */
function shell(count: number, inner: number, outer: number, seed: number) {
  const rng = createRng(seed * 9781);
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const r = inner + rng() * (outer - inner);
    const theta = 2 * Math.PI * rng();
    const phi = Math.acos(2 * rng() - 1);

    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }

  return positions;
}
