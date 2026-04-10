import { useRef, useState, useCallback } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

/** Initial camera position matching the Canvas camera setup. */
export const INITIAL_CAMERA_POSITION = new THREE.Vector3(0, 50, 100);
export const INITIAL_LOOK_AT = new THREE.Vector3(0, 0, 0);

/** Lerp factor controlling animation smoothness (higher = faster). */
export const CAMERA_LERP_FACTOR = 0.05;

/** Distance threshold in world units to consider animation complete. */
export const ARRIVAL_THRESHOLD = 0.5;

export interface UseCameraAnimationReturn {
  isAnimating: boolean;
  moveTo: (position: THREE.Vector3, lookAt: THREE.Vector3) => void;
  resetView: () => void;
  /** Internal refs used by CameraController's useFrame to drive animation. */
  _internal: {
    targetPositionRef: React.RefObject<THREE.Vector3 | null>;
    targetLookAtRef: React.RefObject<THREE.Vector3 | null>;
    currentLookAtRef: React.RefObject<THREE.Vector3>;
    setIsAnimating: React.Dispatch<React.SetStateAction<boolean>>;
  };
}

/**
 * Manages camera animation state and control functions.
 * Must be used inside a component that is a child of <Canvas>.
 *
 * Animation is driven by CameraController via useFrame (task 7.2).
 */
export function useCameraAnimation(
  controlsRef: React.RefObject<OrbitControlsImpl | null>
): UseCameraAnimationReturn {
  useThree(); // ensure we're inside Canvas context

  const [isAnimating, setIsAnimating] = useState(false);

  /** Where the camera should move to. */
  const targetPositionRef = useRef<THREE.Vector3 | null>(null);
  /** Where the camera should look at when it arrives. */
  const targetLookAtRef = useRef<THREE.Vector3 | null>(null);
  /** Current interpolated lookAt — lerped each frame during animation. */
  const currentLookAtRef = useRef<THREE.Vector3>(INITIAL_LOOK_AT.clone());

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

  return {
    isAnimating,
    moveTo,
    resetView,
    _internal: {
      targetPositionRef,
      targetLookAtRef,
      currentLookAtRef,
      setIsAnimating,
    },
  };
}
