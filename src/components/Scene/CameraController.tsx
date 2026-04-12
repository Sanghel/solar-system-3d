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

function getCameraOffset(planet: Planet): { lateral: number; vertical: number } {
  const viewRadius =
    planet.id === "saturn"
      ? planet.relativeSize * 2.2
      : planet.relativeSize;

  const lateral = Math.max(viewRadius * 4.5 + 15, 30);
  const vertical = planet.relativeSize * 1.5;

  return { lateral, vertical };
}

/**
 * Lives inside <Canvas> and drives camera animation + orbit tracking.
 *
 * Follow behaviour after the fly-to animation lands is split into two
 * independent components applied every frame:
 *
 * 1. Orbit tracking — the planet's frame-by-frame world-position delta is
 *    added to both the OrbitControls target and the camera so the viewing
 *    angle and distance are preserved as the planet moves.
 *
 * 2. Alignment correction — the fly-to animation targets the planet's
 *    position at selection time, but the planet keeps orbiting during the
 *    1.4 s flight. When the animation lands there is a residual gap between
 *    the camera's look-at point and the planet's actual position. This gap
 *    is closed with an exponential ease-out over ~0.5 s so the camera drifts
 *    smoothly onto the planet instead of snapping.
 */
export function CameraController({
  controlsRef,
  selectedPlanet,
  overviewTrigger,
}: CameraControllerProps) {
  const { scene, camera } = useThree();
  const { moveTo, resetView, isAnimating } = useCameraAnimation(controlsRef);

  const isFirstRender = useRef(true);
  /** Planet world-position recorded on the previous frame for delta calculation. */
  const prevPlanetPosRef = useRef<Vector3 | null>(null);
  /** Detects the frame the fly-to animation finishes. */
  const wasAnimatingRef = useRef(false);
  /**
   * Gap between the OrbitControls target and the planet's actual position
   * at the moment the fly-to animation lands. Closed gradually over ~0.5 s.
   */
  const alignmentGapRef = useRef<Vector3 | null>(null);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (!selectedPlanet) {
      prevPlanetPosRef.current = null;
      alignmentGapRef.current = null;
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
      minDistance: Math.max(selectedPlanet.relativeSize * 1.5, 5),
      maxDistance: lateral * 4,
    });
  }, [selectedPlanet, scene, moveTo, resetView]);

  useEffect(() => {
    if (overviewTrigger === 0) return;
    prevPlanetPosRef.current = null;
    alignmentGapRef.current = null;
    resetView();
  }, [overviewTrigger, resetView]);

  useFrame((_, delta) => {
    const animationJustEnded = wasAnimatingRef.current && !isAnimating;
    wasAnimatingRef.current = isAnimating;

    if (isAnimating || !selectedPlanet || !controlsRef.current) return;

    const planetMesh = scene.getObjectByName(selectedPlanet.id);
    if (!planetMesh) return;

    const currentPos = new Vector3();
    planetMesh.getWorldPosition(currentPos);

    if (animationJustEnded || !prevPlanetPosRef.current) {
      // The fly-to just landed. Record the gap between the camera's current
      // look-at (planet position at selection time) and where the planet
      // actually is now after orbiting during the animation. This will be
      // closed smoothly in subsequent frames instead of snapping instantly.
      alignmentGapRef.current = currentPos.clone().sub(controlsRef.current.target);
      prevPlanetPosRef.current = currentPos.clone();
      return;
    }

    // ── Component 1: orbit tracking ──────────────────────────────────────────
    // Move target + camera by the same delta the planet travelled this frame
    // so the viewing angle and distance remain constant.
    const orbitDelta = currentPos.clone().sub(prevPlanetPosRef.current);
    if (orbitDelta.lengthSq() > 1e-8) {
      controlsRef.current.target.add(orbitDelta);
      camera.position.add(orbitDelta);
    }

    // ── Component 2: alignment correction ────────────────────────────────────
    // Exponential ease-out: factor 6 closes ~95 % of the gap in ~0.5 s.
    // Runs in parallel with orbit tracking until the gap is negligible.
    if (alignmentGapRef.current && alignmentGapRef.current.lengthSq() > 1e-4) {
      const t = 1 - Math.exp(-delta * 6);
      const correction = alignmentGapRef.current.clone().multiplyScalar(t);
      controlsRef.current.target.add(correction);
      camera.position.add(correction);
      alignmentGapRef.current.sub(correction);
    } else {
      alignmentGapRef.current = null;
    }

    controlsRef.current.update();
    prevPlanetPosRef.current = currentPos.clone();
  });

  return null;
}
