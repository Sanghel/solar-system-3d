import { useEffect, useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { Vector3 } from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { useCameraAnimation } from "../../hooks/useCameraAnimation";
import type { Planet } from "../../types/planet";

interface CameraControllerProps {
  controlsRef: React.RefObject<OrbitControlsImpl | null>;
  selectedPlanet: Planet | null;
  /** Increment to trigger a camera reset regardless of selectedPlanet state. */
  overviewTrigger: number;
}

/**
 * Calculates the lateral (X/Z) camera offset from the planet centre.
 *
 * Rules:
 * - Base distance scales with the planet's visual radius so the planet fills
 *   a consistent portion of the screen at the 75° FOV used by the canvas.
 * - Saturn gets extra distance to keep its ring system (extends to 2.2×
 *   relativeSize) fully in view.
 * - A hard minimum of 30 world units prevents getting uncomfortably close
 *   to small planets like Mercury or Mars.
 */
function getCameraOffset(planet: Planet): { lateral: number; vertical: number } {
  const viewRadius =
    planet.id === "saturn"
      ? planet.relativeSize * 2.2 // outer ring radius
      : planet.relativeSize;

  const lateral = Math.max(viewRadius * 4.5 + 15, 30);
  const vertical = planet.relativeSize * 1.5;

  return { lateral, vertical };
}

/**
 * Lives inside <Canvas> and drives camera animation whenever the selected
 * planet changes or the overview trigger fires.
 *
 * After the fly-to animation completes, the camera continuously tracks the
 * planet's orbital position: each frame the planet's world-space delta is
 * applied to both the OrbitControls target and the camera position, so the
 * user's chosen angle and distance are preserved while the planet moves.
 */
export function CameraController({
  controlsRef,
  selectedPlanet,
  overviewTrigger,
}: CameraControllerProps) {
  const { scene, camera } = useThree();
  const { moveTo, resetView, isAnimating } = useCameraAnimation(controlsRef);

  // Skip the very first render so we don't reset the view on mount
  const isFirstRender = useRef(true);

  // Tracks planet position from the previous frame for delta calculation
  const prevPlanetPosRef = useRef<Vector3 | null>(null);
  // Detects the frame when the fly-to animation finishes
  const wasAnimatingRef = useRef(false);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (!selectedPlanet) {
      prevPlanetPosRef.current = null;
      resetView();
      return;
    }

    const planetMesh = scene.getObjectByName(selectedPlanet.id);
    if (!planetMesh) return;

    const planetPos = new Vector3();
    planetMesh.getWorldPosition(planetPos);

    const { lateral, vertical } = getCameraOffset(selectedPlanet);
    const cameraPos = new Vector3(
      planetPos.x + lateral,
      planetPos.y + vertical,
      planetPos.z + lateral
    );

    moveTo(cameraPos, planetPos.clone(), {
      // Allow zooming in close to the planet surface but not past the centre
      minDistance: Math.max(selectedPlanet.relativeSize * 1.5, 5),
      // Limit zoom-out so the planet stays easily visible
      maxDistance: lateral * 4,
    });
  }, [selectedPlanet, scene, moveTo, resetView]);

  // Separate effect: always reset when overview is explicitly requested
  useEffect(() => {
    if (overviewTrigger === 0) return; // skip initial render
    prevPlanetPosRef.current = null;
    resetView();
  }, [overviewTrigger, resetView]);

  // Each frame: once the fly-to finishes, follow the planet along its orbit.
  // The delta between the planet's current and previous world position is
  // added to both the OrbitControls target and the camera so the viewing
  // angle and distance remain constant while the planet moves.
  useFrame(() => {
    const animationJustEnded = wasAnimatingRef.current && !isAnimating;
    wasAnimatingRef.current = isAnimating;

    if (isAnimating || !selectedPlanet || !controlsRef.current) return;

    const planetMesh = scene.getObjectByName(selectedPlanet.id);
    if (!planetMesh) return;

    const currentPos = new Vector3();
    planetMesh.getWorldPosition(currentPos);

    if (animationJustEnded || !prevPlanetPosRef.current) {
      // First follow frame: snap the OrbitControls target to the planet's
      // actual current position (it may have moved during the 1.4 s fly-to).
      const snapDelta = currentPos.clone().sub(controlsRef.current.target);
      controlsRef.current.target.copy(currentPos);
      camera.position.add(snapDelta);
      controlsRef.current.update();
    } else {
      const delta = currentPos.clone().sub(prevPlanetPosRef.current);
      if (delta.lengthSq() > 1e-6) {
        controlsRef.current.target.add(delta);
        camera.position.add(delta);
        controlsRef.current.update();
      }
    }

    prevPlanetPosRef.current = currentPos.clone();
  });

  return null;
}
