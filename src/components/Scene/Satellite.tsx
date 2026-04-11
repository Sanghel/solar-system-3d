import { memo, useRef, Suspense } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { Group } from "three";
import type { Satellite as SatelliteType } from "../../types/planet";
import { useSimulation } from "../../context/SimulationContext";

interface SatelliteProps {
  satellite: SatelliteType;
  /** Parent planet's relativeSize — scales the orbitRadius to scene units */
  planetSize: number;
  /** When true the satellite is rendered slightly larger to aid visibility */
  isSelected?: boolean;
}

interface SatelliteMeshProps {
  satellite: SatelliteType;
}

/** Inner mesh that loads and applies the satellite texture via Suspense. */
const SatelliteTexturedMesh = ({ satellite }: SatelliteMeshProps) => {
  const texture = useTexture(satellite.texturePath!);
  return (
    <mesh>
      <sphereGeometry args={[satellite.size, 16, 16]} />
      <meshStandardMaterial map={texture} metalness={0.1} roughness={0.7} />
    </mesh>
  );
};

/** Fallback mesh rendered while texture is loading or when no texture is provided. */
const SatelliteFallbackMesh = ({ satellite }: SatelliteMeshProps) => (
  <mesh>
    <sphereGeometry args={[satellite.size, 16, 16]} />
    <meshStandardMaterial
      color={satellite.color ?? "#A0A0A0"}
      metalness={0.1}
      roughness={0.7}
    />
  </mesh>
);

/**
 * Renders a moon orbiting its parent planet.
 *
 * Must be placed INSIDE the planet's orbital <group> so that its local-space
 * position is relative to the planet center. The orbit is calculated in the
 * planet's local XZ plane (ecliptic-aligned), independent of the planet's
 * axial tilt group.
 */
export const Satellite = memo(({ satellite, planetSize, isSelected }: SatelliteProps) => {
  // Random initial angle so moons don't all start at the same position
  const angleRef = useRef<number>(Math.random() * Math.PI * 2);
  const groupRef = useRef<Group>(null);
  const { timeScale } = useSimulation();

  // Scale orbit to scene units using the planet's rendered size
  const orbitRadius = satellite.orbitRadius * planetSize;

  useFrame((_, delta) => {
    angleRef.current += satellite.orbitSpeed * timeScale * delta * 60;
    if (groupRef.current) {
      // Local position relative to the planet orbital group center
      groupRef.current.position.set(
        orbitRadius * Math.cos(angleRef.current),
        0,
        orbitRadius * Math.sin(angleRef.current),
      );
    }
  });

  const scale = isSelected ? 1.6 : 1;

  return (
    <group ref={groupRef} scale={scale}>
      {satellite.texturePath ? (
        <Suspense fallback={<SatelliteFallbackMesh satellite={satellite} />}>
          <SatelliteTexturedMesh satellite={satellite} />
        </Suspense>
      ) : (
        <SatelliteFallbackMesh satellite={satellite} />
      )}
    </group>
  );
});
