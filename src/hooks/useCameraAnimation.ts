import { useRef, useState, useCallback } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

/** Initial camera position matching the Canvas camera setup. */
export const INITIAL_CAMERA_POSITION = new THREE.Vector3(0, 50, 100);
export const INITIAL_LOOK_AT = new THREE.Vector3(0, 0, 0);

/** Lerp factor controlling animation smoothness (higher = faster). */
const CAMERA_LERP_FACTOR = 0.05;

/** Distance threshold in world units to consider the animation complete. */
const ARRIVAL_THRESHOLD = 0.5;

export interface UseCameraAnimationReturn {
  isAnimating: boolean;
  moveTo: (position: THREE.Vector3, lookAt: THREE.Vector3) => void;
  resetView: () => void;
}

/**
 * Manages smooth camera animation via lerp inside a React Three Fiber Canvas.
 * Must be used inside a component that is a child of <Canvas>.
 *
 * Each frame it lerps the camera position and lookAt toward the current target.
 * OrbitControls are disabled during animation and re-enabled (with an updated
 * target) once the camera arrives.
 */
export function useCameraAnimation(
  controlsRef: React.RefObject<OrbitControlsImpl | null>
): UseCameraAnimationReturn {
  const { camera } = useThree();

  const [isAnimating, setIsAnimating] = useState(false);

  /** Where the camera should move to (null = no active animation). */
  const targetPositionRef = useRef<THREE.Vector3 | null>(null);
  /** Where the camera should point when it arrives. */
  const targetLookAtRef = useRef<THREE.Vector3 | null>(null);
  /** Current interpolated lookAt — updated each frame during animation. */
  const currentLookAtRef = useRef<THREE.Vector3>(INITIAL_LOOK_AT.clone());

  useFrame(() => {
    if (!targetPositionRef.current || !targetLookAtRef.current) return;

    const distToTarget = camera.position.distanceTo(targetPositionRef.current);

    if (distToTarget < ARRIVAL_THRESHOLD) {
      // Snap to exact target and finish animation
      camera.position.copy(targetPositionRef.current);
      currentLookAtRef.current.copy(targetLookAtRef.current);
      camera.lookAt(currentLookAtRef.current);

      if (controlsRef.current) {
        controlsRef.current.target.copy(targetLookAtRef.current);
        controlsRef.current.enabled = true;
        controlsRef.current.update();
      }

      targetPositionRef.current = null;
      targetLookAtRef.current = null;
      setIsAnimating(false);
      return;
    }

    // Lerp camera position toward target
    camera.position.lerp(targetPositionRef.current, CAMERA_LERP_FACTOR);

    // Lerp lookAt and apply to camera
    currentLookAtRef.current.lerp(targetLookAtRef.current, CAMERA_LERP_FACTOR);
    camera.lookAt(currentLookAtRef.current);
  });

  const moveTo = useCallback(
    (position: THREE.Vector3, lookAt: THREE.Vector3) => {
      targetPositionRef.current = position.clone();
      targetLookAtRef.current = lookAt.clone();

      if (controlsRef.current) {
        controlsRef.current.enabled = false;
        controlsRef.current.autoRotate = false;
      }

      setIsAnimating(true);
    },
    [controlsRef]
  );

  const resetView = useCallback(() => {
    moveTo(INITIAL_CAMERA_POSITION.clone(), INITIAL_LOOK_AT.clone());
  }, [moveTo]);

  return { isAnimating, moveTo, resetView };
}
