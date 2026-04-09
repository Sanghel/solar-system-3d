import { useRef, Suspense } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { Mesh, Group } from "three";
import type { Planet as PlanetType } from "../../types/planet";
import { getOrbitRadius } from "../../utils/orbitUtils";
import { useSimulation } from "../../context/SimulationContext";

interface PlanetComponentProps {
  planet: PlanetType;
  index: number;
  onSelect?: (planet: PlanetType) => void;
  isSelected?: boolean;
}

interface PlanetMeshProps {
  planet: PlanetType;
  isSelected?: boolean;
  onSelect?: (planet: PlanetType) => void;
}

/** Inner mesh that loads and applies the planet texture via Suspense. */
const PlanetTexturedMesh = ({ planet, isSelected, onSelect }: PlanetMeshProps) => {
  const meshRef = useRef<Mesh>(null);
  const texture = useTexture(planet.texture!);
  const { timeScale } = useSimulation();

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += planet.rotationSpeed * timeScale * delta * 60;
    }
  });

  return (
    <mesh
      ref={meshRef}
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
const PlanetFallbackMesh = ({ planet, isSelected, onSelect }: PlanetMeshProps) => {
  const meshRef = useRef<Mesh>(null);
  const { timeScale } = useSimulation();

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += planet.rotationSpeed * timeScale * delta * 60;
    }
  });

  return (
    <mesh
      ref={meshRef}
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

/** Selection ring rendered inside the planet group so it follows the orbit. */
const PlanetSelectionRing = ({ planet }: { planet: PlanetType }) => {
  const ringRadius = planet.relativeSize * 1.5;
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[ringRadius, ringRadius * 0.1, 16, 32]} />
      <meshBasicMaterial color="#00ff00" />
    </mesh>
  );
};

/** Saturn's iconic ring system — RingGeometry tilted to match Saturn's appearance. */
const SaturnRing = ({ planetRadius }: { planetRadius: number }) => {
  const innerRadius = planetRadius * 1.3;
  const outerRadius = planetRadius * 2.2;
  return (
    <mesh rotation={[Math.PI / 2.5, 0, 0]}>
      <ringGeometry args={[innerRadius, outerRadius, 64]} />
      <meshBasicMaterial
        color="#c2a96e"
        transparent
        opacity={0.75}
        side={2}
      />
    </mesh>
  );
};

export const Planet = ({
  planet,
  index,
  onSelect,
  isSelected,
}: PlanetComponentProps) => {
  const groupRef = useRef<Group>(null);
  const { timeScale } = useSimulation();
  const orbitRadius = getOrbitRadius(planet.distanceFromSun);
  const initialAngle = (index * Math.PI * 2) / 8;
  const angleRef = useRef(initialAngle);

  useFrame((_, delta) => {
    angleRef.current += planet.orbitSpeed * timeScale * delta * 60;
    if (groupRef.current) {
      groupRef.current.position.set(
        orbitRadius * Math.cos(angleRef.current),
        0,
        orbitRadius * Math.sin(angleRef.current)
      );
    }
  });

  const meshProps: PlanetMeshProps = { planet, isSelected, onSelect };

  return (
    <group ref={groupRef}>
      {planet.texture ? (
        <Suspense fallback={<PlanetFallbackMesh {...meshProps} />}>
          <PlanetTexturedMesh {...meshProps} />
        </Suspense>
      ) : (
        <PlanetFallbackMesh {...meshProps} />
      )}
      {planet.id === "saturn" && <SaturnRing planetRadius={planet.relativeSize} />}
      {isSelected && <PlanetSelectionRing planet={planet} />}
    </group>
  );
};
