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
  onSelect?: (planet: PlanetType) => void;
}

/** Inner mesh that loads and applies the planet texture via Suspense. */
const PlanetTexturedMesh = ({ planet, onSelect }: PlanetMeshProps) => {
  const meshRef = useRef<Mesh>(null);
  const texture = useTexture(planet.texture!);
  const { timeScale } = useSimulation();

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y +=
        planet.rotationSpeed * timeScale * delta * 60;
    }
  });

  return (
    <mesh ref={meshRef} name={planet.id} onClick={() => onSelect?.(planet)}>
      <sphereGeometry args={[planet.relativeSize, 32, 32]} />
      <meshStandardMaterial
        map={texture}
        metalness={0.1}
        roughness={0.8}
      />
    </mesh>
  );
};

/** Fallback mesh rendered while texture is loading or when no texture is available. */
const PlanetFallbackMesh = ({ planet, onSelect }: PlanetMeshProps) => {
  const meshRef = useRef<Mesh>(null);
  const { timeScale } = useSimulation();

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y +=
        planet.rotationSpeed * timeScale * delta * 60;
    }
  });

  return (
    <mesh ref={meshRef} name={planet.id} onClick={() => onSelect?.(planet)}>
      <sphereGeometry args={[planet.relativeSize, 32, 32]} />
      <meshStandardMaterial
        color={planet.baseColor}
        metalness={0.3}
        roughness={0.7}
      />
    </mesh>
  );
};

/**
 * Small downward-pointing arrow above the selected planet.
 * Bobs gently up and down to draw attention without overwhelming the scene.
 */
const SelectionArrow = ({ planet }: { planet: PlanetType }) => {
  const groupRef = useRef<Group>(null);
  const coneRadius = Math.max(planet.relativeSize * 0.18, 0.8);
  const coneHeight = coneRadius * 2.2;
  // Position the tip just above the planet surface with a small gap
  const yOffset = planet.relativeSize + coneHeight * 1.4;

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle vertical bob: ±coneHeight * 0.4 over ~2 seconds
      groupRef.current.position.y =
        yOffset + Math.sin(state.clock.elapsedTime * 2.5) * coneHeight * 0.4;
    }
  });

  return (
    <group ref={groupRef} position={[0, yOffset, 0]}>
      {/* Cone pointing downward (rotate 180° on Z or flip via PI on X) */}
      <mesh rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[coneRadius, coneHeight, 6]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.75} />
      </mesh>
    </group>
  );
};

/** Saturn's iconic ring system — two ring layers for a banded look. */
const SaturnRing = ({ planetRadius }: { planetRadius: number }) => {
  const outerInner = planetRadius * 1.4;
  const outerOuter = planetRadius * 2.2;
  const innerInner = planetRadius * 1.1;
  const innerOuter = planetRadius * 1.35;
  const tilt: [number, number, number] = [Math.PI / 2 - 0.47, 0, 0];
  return (
    <group rotation={tilt}>
      <mesh>
        <ringGeometry args={[outerInner, outerOuter, 128]} />
        <meshBasicMaterial
          color="#d4b483"
          transparent
          opacity={0.82}
          side={2}
        />
      </mesh>
      <mesh>
        <ringGeometry args={[innerInner, innerOuter, 128]} />
        <meshBasicMaterial
          color="#a89060"
          transparent
          opacity={0.55}
          side={2}
        />
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
        orbitRadius * Math.sin(angleRef.current),
      );
    }
  });

  const meshProps: PlanetMeshProps = { planet, onSelect };

  return (
    <group ref={groupRef}>
      {planet.texture ? (
        <Suspense fallback={<PlanetFallbackMesh {...meshProps} />}>
          <PlanetTexturedMesh {...meshProps} />
        </Suspense>
      ) : (
        <PlanetFallbackMesh {...meshProps} />
      )}
      {planet.id === "saturn" && (
        <SaturnRing planetRadius={planet.relativeSize} />
      )}
      {isSelected && <SelectionArrow planet={planet} />}
    </group>
  );
};
