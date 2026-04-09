import { useRef, Suspense } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { Mesh } from "three";
import type { Planet as PlanetType } from "../../types/planet";

interface PlanetComponentProps {
  planet: PlanetType;
  index: number;
  onSelect?: (planet: PlanetType) => void;
  isSelected?: boolean;
  onPlanetPosition?: (position: [number, number, number]) => void;
}

interface PlanetMeshProps {
  planet: PlanetType;
  position: [number, number, number];
  isSelected?: boolean;
  onSelect?: (planet: PlanetType) => void;
}

/** Inner mesh that loads and applies the planet texture via Suspense. */
const PlanetTexturedMesh = ({ planet, position, isSelected, onSelect }: PlanetMeshProps) => {
  const meshRef = useRef<Mesh>(null);
  const texture = useTexture(planet.texture!);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += planet.rotationSpeed;
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      name={planet.id}
      onClick={() => onSelect?.(planet)}
    >
      <sphereGeometry args={[planet.relativeSize, 32, 32]} />
      <meshStandardMaterial
        map={texture}
        metalness={0.1}
        roughness={0.8}
        emissive={isSelected ? planet.baseColor : "#000000"}
        emissiveIntensity={isSelected ? 0.3 : 0}
      />
    </mesh>
  );
};

/** Fallback mesh rendered while texture is loading or when no texture is available. */
const PlanetFallbackMesh = ({ planet, position, isSelected, onSelect }: PlanetMeshProps) => {
  const meshRef = useRef<Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += planet.rotationSpeed;
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      name={planet.id}
      onClick={() => onSelect?.(planet)}
    >
      <sphereGeometry args={[planet.relativeSize, 32, 32]} />
      <meshStandardMaterial
        color={planet.baseColor}
        metalness={0.3}
        roughness={0.7}
        emissive={isSelected ? planet.baseColor : "#000000"}
        emissiveIntensity={isSelected ? 0.5 : 0}
      />
    </mesh>
  );
};

export const Planet = ({ planet, index, onSelect, isSelected, onPlanetPosition }: PlanetComponentProps) => {
  const orbitAngle = useRef((index * Math.PI * 2) / 8);

  // Calculate position on orbit - scaled logarithmically for visibility
  const orbitRadius = Math.pow(Math.log10(planet.distanceFromSun + 1), 1.8) * 3;

  const x = orbitRadius * Math.cos(orbitAngle.current);
  const z = orbitRadius * Math.sin(orbitAngle.current);
  const position: [number, number, number] = [x, 0, z];

  // Notify parent when selected to show ring
  if (isSelected) {
    onPlanetPosition?.(position);
  }

  const meshProps: PlanetMeshProps = { planet, position, isSelected, onSelect };

  if (planet.texture) {
    return (
      <Suspense fallback={<PlanetFallbackMesh {...meshProps} />}>
        <PlanetTexturedMesh {...meshProps} />
      </Suspense>
    );
  }

  return <PlanetFallbackMesh {...meshProps} />;
};
