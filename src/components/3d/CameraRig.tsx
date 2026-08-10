"use client";

import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScrollProgress } from "./useScrollProgress";

/**
 * "Camera slowly flies forward" — design/animations.md.
 *
 * Scroll dollies the camera in along z while the pointer adds a small parallax
 * offset. Both are damped rather than assigned, so the motion keeps drifting
 * for a beat after input stops instead of freezing.
 */
export default function CameraRig() {
  const scroll = useScrollProgress();

  // The camera comes off the frame state rather than `useThree()` — r3f owns
  // the object either way, but mutating a hook return trips react-hooks rules.
  useFrame(({ camera, pointer }, delta) => {
    const t = scroll.current;

    const targetX = pointer.x * 0.6;
    const targetY = pointer.y * 0.35 + t * 1.2;
    const targetZ = 8 - t * 4.5;

    camera.position.x = THREE.MathUtils.damp(camera.position.x, targetX, 1.6, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, targetY, 1.6, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, targetZ, 2.2, delta);

    camera.lookAt(0, 0, 0);
  });

  return null;
}
