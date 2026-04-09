import { useRef, useEffect } from "react";
import { Mesh } from "three";
import type { Planet as PlanetType } from "../../types/planet";

interface SelectionRingProps {
  /** Selected planet data (null if nothing selected) */
  planet: PlanetType | null;
  /** Position of the selected planet in 3D space */
  planetPosition?: [number, number, number];
}

/**
 * SelectionRing Component
 * Renders a green torus ring around the currently selected planet
 * Provides visual feedback for selection
 */
export const SelectionRing = ({
  planet,
  planetPosition,
}: SelectionRingProps) => {
  const meshRef = useRef<Mesh>(null);

  useEffect(() => {
    if (meshRef.current && planet) {
      meshRef.current.scale.set(1, 1, 1);
    }
  }, [planet]);

  if (!planet || !planetPosition) return null;

  const ringRadius = planet.relativeSize * 1.5;

  return (
    <mesh
      ref={meshRef}
      position={planetPosition}
      rotation={[Math.PI / 2, 0, 0]}
    >
      <torusGeometry args={[ringRadius, ringRadius * 0.1, 16, 32]} />
      <meshBasicMaterial color="#00ff00" />
    </mesh>
  );
};
