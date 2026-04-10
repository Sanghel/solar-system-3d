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

/** Saturn's iconic ring system — two ring layers for a banded look. */
const SaturnRing = ({ planetRadius }: { planetRadius: number }) => {
  // Outer ring (bright band)
  const outerInner = planetRadius * 1.4;
  const outerOuter = planetRadius * 2.2;
  // Inner ring (narrower, slightly darker)
  const innerInner = planetRadius * 1.1;
  const innerOuter = planetRadius * 1.35;
  // Tilt: ~27° from horizontal (matching Saturn's real axial tilt roughly)
  const tilt: [number, number, number] = [Math.PI / 2 - 0.47, 0, 0];
  return (
    <group rotation={tilt}>
      {/* Main bright ring */}
      <mesh>
        <ringGeometry args={[outerInner, outerOuter, 128]} />
        <meshBasicMaterial color="#d4b483" transparent opacity={0.82} side={2} />
      </mesh>
      {/* Inner darker gap ring */}
      <mesh>
        <ringGeometry args={[innerInner, innerOuter, 128]} />
        <meshBasicMaterial color="#a89060" transparent opacity={0.55} side={2} />
      </mesh>
    </group>
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
  const orbitRadius = getOrbitRadius(planet.distanceFromSun, planet.id);
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
