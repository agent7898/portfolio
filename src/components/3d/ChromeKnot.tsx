"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScrollProgress } from "./useScrollProgress";

/**
 * Polished chrome, not glass: metalness 1 with a near-zero roughness means the
 * surface is pure reflection, so what you actually see is the Lightformer rig
 * in Scene.tsx. That is why the environment is hand-built rather than an HDRI
 * preset — a preset drags in colour the brief rules out.
 */
/** Sized so the object crowns the wordmark instead of sitting on top of it. */
const BASE_SCALE = 0.62;

export default function ChromeKnot() {
  const meshRef = useRef<THREE.Mesh>(null);
  const scroll = useScrollProgress();

  useFrame((state, delta) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const { pointer, clock } = state;

    // Constant slow yaw — the object is never still, never fast.
    mesh.rotation.y += delta * 0.14;

    // Pointer steers the object a few degrees, which slides the reflections
    // across it. Damped, so the highlights glide instead of snapping.
    mesh.rotation.x = THREE.MathUtils.damp(
      mesh.rotation.x,
      pointer.y * 0.28 + Math.sin(clock.elapsedTime * 0.35) * 0.1,
      2.5,
      delta
    );
    mesh.rotation.z = THREE.MathUtils.damp(mesh.rotation.z, pointer.x * -0.2, 2.5, delta);

    // Sits above the wordmark rather than behind it, and drifts further up and
    // back as the page advances so it leaves the hero without ever vanishing.
    mesh.position.y = 1.55 + Math.sin(clock.elapsedTime * 0.5) * 0.07 + scroll.current * 3.2;
    mesh.position.z = scroll.current * -6;

    const scale = BASE_SCALE * (1 - scroll.current * 0.25);
    mesh.scale.setScalar(scale);
  });

  return (
    <mesh ref={meshRef} scale={BASE_SCALE} castShadow={false} receiveShadow={false}>
      <torusKnotGeometry args={[1.15, 0.34, 320, 48]} />
      <meshStandardMaterial
        color="#ffffff"
        metalness={1}
        roughness={0.06}
        envMapIntensity={1.35}
      />
    </mesh>
  );
}
