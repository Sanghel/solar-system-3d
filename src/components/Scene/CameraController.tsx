import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
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
 * Uses scene.getObjectByName to find the planet mesh and read its current
 * world position, so the camera always flies to where the planet actually
 * is in its orbit at the moment of selection.
 */
export function CameraController({
  controlsRef,
  selectedPlanet,
  overviewTrigger,
}: CameraControllerProps) {
  const { scene } = useThree();
  const { moveTo, resetView } = useCameraAnimation(controlsRef);

  // Skip the very first render so we don't reset the view on mount
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (!selectedPlanet) {
      resetView();
      return;
    }

    const planetMesh = scene.getObjectByName(selectedPlanet.id);
    if (!planetMesh) return;

    const planetPos = new THREE.Vector3();
    planetMesh.getWorldPosition(planetPos);

    const { lateral, vertical } = getCameraOffset(selectedPlanet);
    const cameraPos = new THREE.Vector3(
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
    resetView();
  }, [overviewTrigger, resetView]);

  return null;
}
