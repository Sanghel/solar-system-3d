import { useRef, useState, useCallback } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

/** Initial camera position matching the Canvas camera setup. */
export const INITIAL_CAMERA_POSITION = new Vector3(0, 50, 100);
export const INITIAL_LOOK_AT = new Vector3(0, 0, 0);

/** Original OrbitControls distance bounds (match SolarSystemCanvas defaults). */
const DEFAULT_MIN_DISTANCE = 50;
const DEFAULT_MAX_DISTANCE = 650;

/** Total animation duration in seconds. */
const ANIMATION_DURATION = 1.4;

/** Cubic ease-in-out: slow start, fast middle, slow end. */
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export interface MoveToOptions {
  /** Minimum zoom-in distance once OrbitControls re-enable. Defaults to 50. */
  minDistance?: number;
  /** Maximum zoom-out distance once OrbitControls re-enable. Defaults to 650. */
  maxDistance?: number;
}

export interface UseCameraAnimationReturn {
  isAnimating: boolean;
  moveTo: (
    position: Vector3,
    lookAt: Vector3,
    options?: MoveToOptions
  ) => void;
  resetView: () => void;
}

/**
 * Manages smooth camera animation inside a React Three Fiber Canvas.
 * Must be used inside a component that is a child of <Canvas>.
 *
 * Each animation runs for ANIMATION_DURATION seconds with a cubic ease-in-out
 * curve: the camera accelerates smoothly, reaches peak speed mid-flight, then
 * decelerates into the target position.
 *
 * OrbitControls are disabled during animation and re-enabled (with an updated
 * target and the requested minDistance/maxDistance) once the camera arrives.
 */
export function useCameraAnimation(
  controlsRef: React.RefObject<OrbitControlsImpl | null>
): UseCameraAnimationReturn {
  const { camera } = useThree();

  const [isAnimating, setIsAnimating] = useState(false);

  const targetPositionRef = useRef<Vector3 | null>(null);
  const targetLookAtRef = useRef<Vector3 | null>(null);
  const currentLookAtRef = useRef<Vector3>(INITIAL_LOOK_AT.clone());

  // Snapshot of camera state at the moment each animation begins
  const startPositionRef = useRef<Vector3>(INITIAL_CAMERA_POSITION.clone());
  const startLookAtRef = useRef<Vector3>(INITIAL_LOOK_AT.clone());
  const animStartTimeRef = useRef<number | null>(null);

  // Bounds to apply once controls re-enable after animation
  const pendingMinDistRef = useRef(DEFAULT_MIN_DISTANCE);
  const pendingMaxDistRef = useRef(DEFAULT_MAX_DISTANCE);

  useFrame((state) => {
    if (!targetPositionRef.current || !targetLookAtRef.current) return;

    // Record the starting state on the first frame of this animation
    if (animStartTimeRef.current === null) {
      animStartTimeRef.current = state.clock.elapsedTime;
      startPositionRef.current = camera.position.clone();
      startLookAtRef.current = currentLookAtRef.current.clone();
    }

    const elapsed = state.clock.elapsedTime - animStartTimeRef.current;
    const rawT = Math.min(elapsed / ANIMATION_DURATION, 1);
    const t = easeInOutCubic(rawT);

    // Interpolate position and lookAt along the eased curve
    camera.position.lerpVectors(
      startPositionRef.current,
      targetPositionRef.current,
      t
    );
    currentLookAtRef.current.lerpVectors(
      startLookAtRef.current,
      targetLookAtRef.current,
      t
    );
    camera.lookAt(currentLookAtRef.current);

    if (rawT >= 1) {
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

      animStartTimeRef.current = null;
      targetPositionRef.current = null;
      targetLookAtRef.current = null;
      setIsAnimating(false);
    }
  });

  const moveTo = useCallback(
    (
      position: Vector3,
      lookAt: Vector3,
      options: MoveToOptions = {}
    ) => {
      targetPositionRef.current = position.clone();
      targetLookAtRef.current = lookAt.clone();
      pendingMinDistRef.current = options.minDistance ?? DEFAULT_MIN_DISTANCE;
      pendingMaxDistRef.current = options.maxDistance ?? DEFAULT_MAX_DISTANCE;
      // Reset start-time so useFrame records camera state on the next frame
      animStartTimeRef.current = null;

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
