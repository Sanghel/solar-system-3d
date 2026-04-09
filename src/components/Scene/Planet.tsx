import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";
import type { Planet as PlanetType } from "../../types/planet";

interface PlanetComponentProps {
  planet: PlanetType;
  index: number;
  onSelect?: (planet: PlanetType) => void;
  isSelected?: boolean;
}

export const Planet = ({ planet, index, onSelect, isSelected }: PlanetComponentProps) => {
  const meshRef = useRef<Mesh>(null);
  const orbitAngle = useRef((index * Math.PI * 2) / 8);

  // Calculate position on orbit - scaled logarithmically for visibility
  const orbitRadius = Math.pow(Math.log10(planet.distanceFromSun + 1), 1.8) * 3;

  // Fixed position based on planet index, not random
  const x = orbitRadius * Math.cos(orbitAngle.current);
  const z = orbitRadius * Math.sin(orbitAngle.current);

  // Rotation animation
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += planet.rotationSpeed;
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={[x, 0, z]}
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
