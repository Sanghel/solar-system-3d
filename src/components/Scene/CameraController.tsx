import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { useCameraAnimation } from "../../hooks/useCameraAnimation";
import type { Planet } from "../../types/planet";

interface CameraControllerProps {
  controlsRef: React.RefObject<OrbitControlsImpl | null>;
  selectedPlanet: Planet | null;
}

/** Returns an appropriate camera distance based on the planet's visual size. */
function getCameraDistance(relativeSize: number): number {
  return relativeSize * 5 + 20;
}

/**
 * Lives inside <Canvas> and drives camera animation whenever the selected
 * planet changes.  Uses scene.getObjectByName to find the planet mesh and
 * read its current world position, so the camera always flies to where the
 * planet actually is in its orbit at the moment of selection.
 */
export function CameraController({
  controlsRef,
  selectedPlanet,
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

    const distance = getCameraDistance(selectedPlanet.relativeSize);
    const cameraPos = new THREE.Vector3(
      planetPos.x + distance,
      planetPos.y + selectedPlanet.relativeSize * 1.5,
      planetPos.z + distance
    );

    moveTo(cameraPos, planetPos.clone());
  }, [selectedPlanet, scene, moveTo, resetView]);

  return null;
}
