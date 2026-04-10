import { useRef, useState, useCallback } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

/** Initial camera position matching the Canvas camera setup. */
export const INITIAL_CAMERA_POSITION = new THREE.Vector3(0, 50, 100);
export const INITIAL_LOOK_AT = new THREE.Vector3(0, 0, 0);

/** Original OrbitControls distance bounds (match SolarSystemCanvas defaults). */
const DEFAULT_MIN_DISTANCE = 50;
const DEFAULT_MAX_DISTANCE = 650;

/** Lerp factor controlling animation smoothness (higher = faster). */
const CAMERA_LERP_FACTOR = 0.05;

/** Distance threshold in world units to consider the animation complete. */
const ARRIVAL_THRESHOLD = 0.5;

export interface MoveToOptions {
  /** Minimum zoom-in distance once OrbitControls re-enable. Defaults to 50. */
  minDistance?: number;
  /** Maximum zoom-out distance once OrbitControls re-enable. Defaults to 650. */
  maxDistance?: number;
}

export interface UseCameraAnimationReturn {
  isAnimating: boolean;
  moveTo: (
    position: THREE.Vector3,
    lookAt: THREE.Vector3,
    options?: MoveToOptions
  ) => void;
  resetView: () => void;
}

/**
 * Manages smooth camera animation via lerp inside a React Three Fiber Canvas.
 * Must be used inside a component that is a child of <Canvas>.
 *
 * Lifecycle per animation:
 * 1. moveTo() disables OrbitControls and stores target position/lookAt/bounds.
 * 2. useFrame lerps camera position and lookAt toward the target each frame.
 * 3. On arrival the controls are re-enabled with an updated target and the
 *    requested minDistance/maxDistance, so the user can pan/zoom around the
 *    focused object without snapping back.
 */
export function useCameraAnimation(
  controlsRef: React.RefObject<OrbitControlsImpl | null>
): UseCameraAnimationReturn {
  const { camera } = useThree();

  const [isAnimating, setIsAnimating] = useState(false);

  const targetPositionRef = useRef<THREE.Vector3 | null>(null);
  const targetLookAtRef = useRef<THREE.Vector3 | null>(null);
  const currentLookAtRef = useRef<THREE.Vector3>(INITIAL_LOOK_AT.clone());

  // Bounds to apply once controls re-enable after animation
  const pendingMinDistRef = useRef(DEFAULT_MIN_DISTANCE);
  const pendingMaxDistRef = useRef(DEFAULT_MAX_DISTANCE);

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
        controlsRef.current.minDistance = pendingMinDistRef.current;
        controlsRef.current.maxDistance = pendingMaxDistRef.current;
        controlsRef.current.enabled = true;
        controlsRef.current.update();
      }

      targetPositionRef.current = null;
      targetLookAtRef.current = null;
      setIsAnimating(false);
      return;
    }

    camera.position.lerp(targetPositionRef.current, CAMERA_LERP_FACTOR);
    currentLookAtRef.current.lerp(targetLookAtRef.current, CAMERA_LERP_FACTOR);
    camera.lookAt(currentLookAtRef.current);
  });

  const moveTo = useCallback(
    (
      position: THREE.Vector3,
      lookAt: THREE.Vector3,
      options: MoveToOptions = {}
    ) => {
      targetPositionRef.current = position.clone();
      targetLookAtRef.current = lookAt.clone();
      pendingMinDistRef.current = options.minDistance ?? DEFAULT_MIN_DISTANCE;
      pendingMaxDistRef.current = options.maxDistance ?? DEFAULT_MAX_DISTANCE;

      if (controlsRef.current) {
        controlsRef.current.enabled = false;
        controlsRef.current.autoRotate = false;
      }

      setIsAnimating(true);
    },
    [controlsRef]
  );

  const resetView = useCallback(() => {
    moveTo(INITIAL_CAMERA_POSITION.clone(), INITIAL_LOOK_AT.clone(), {
      minDistance: DEFAULT_MIN_DISTANCE,
      maxDistance: DEFAULT_MAX_DISTANCE,
    });
  }, [moveTo]);

  return { isAnimating, moveTo, resetView };
}
