import { useRef, Suspense, useState, memo } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture, Html } from "@react-three/drei";
import { Mesh, Group } from "three";
import type { Planet as PlanetType } from "../../types/planet";
import { planets } from "../../data/planets";
import { getOrbitRadius } from "../../utils/orbitUtils";
import { useSimulation } from "../../context/SimulationContext";

// Preload all planet textures at module load time so they start downloading
// before any Planet component mounts
planets.forEach((p) => p.texture && useTexture.preload(p.texture));

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
  onHover?: (hovered: boolean) => void;
}

/** Inner mesh that loads and applies the planet texture via Suspense. */
const PlanetTexturedMesh = ({
  planet,
  isSelected,
  onSelect,
  onHover,
}: PlanetMeshProps) => {
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
    <mesh
      ref={meshRef}
      name={planet.id}
      onClick={() => onSelect?.(planet)}
      onPointerEnter={(e) => {
        e.stopPropagation();
        document.body.style.cursor = "pointer";
        onHover?.(true);
      }}
      onPointerLeave={() => {
        document.body.style.cursor = "auto";
        onHover?.(false);
      }}
    >
      <sphereGeometry args={[planet.relativeSize, 32, 32]} />
      <meshStandardMaterial
        map={texture}
        metalness={0.1}
        roughness={0.6}
        emissive={isSelected ? planet.baseColor : "#000000"}
        emissiveIntensity={0}
      />
    </mesh>
  );
};

/** Fallback mesh rendered while texture is loading or when no texture is available. */
const PlanetFallbackMesh = ({ planet, onSelect, onHover }: PlanetMeshProps) => {
  const meshRef = useRef<Mesh>(null);
  const { timeScale } = useSimulation();

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y +=
        planet.rotationSpeed * timeScale * delta * 60;
    }
  });

  return (
    <mesh
      ref={meshRef}
      name={planet.id}
      onClick={() => onSelect?.(planet)}
      onPointerEnter={(e) => {
        e.stopPropagation();
        document.body.style.cursor = "pointer";
        onHover?.(true);
      }}
      onPointerLeave={() => {
        document.body.style.cursor = "auto";
        onHover?.(false);
      }}
    >
      <sphereGeometry args={[planet.relativeSize, 32, 32]} />
      <meshStandardMaterial
        color={planet.baseColor}
        metalness={0.3}
        roughness={0.6}
        emissive={planet.baseColor}
        emissiveIntensity={0}
      />
    </mesh>
  );
};

/**
 * Small downward-pointing arrow above the selected planet.
 * Bobs gently up and down to draw attention without overwhelming the scene.
 */
const SelectionArrow = memo(({ planet }: { planet: PlanetType }) => {
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
});

/** Saturn's iconic ring system — two ring layers for a banded look. */
const SaturnRing = memo(({ planetRadius }: { planetRadius: number }) => {
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
});

/** Tooltip shown on hover above the planet. */
const PlanetTooltip = memo(({ planet }: { planet: PlanetType }) => (
  <Html
    center
    position={[0, planet.relativeSize + 1.8, 0]}
    style={{ pointerEvents: "none" }}
  >
    <div
      style={{
        background: "rgba(8, 14, 30, 0.92)",
        border: `1px solid ${planet.baseColor}55`,
        borderRadius: "8px",
        padding: "6px 12px",
        backdropFilter: "blur(10px)",
        whiteSpace: "nowrap",
        textAlign: "center",
        boxShadow: `0 0 12px ${planet.baseColor}33`,
        userSelect: "none",
      }}
    >
      <div
        style={{
          color: planet.baseColor,
          fontWeight: 700,
          fontSize: "13px",
          letterSpacing: "0.04em",
        }}
      >
        {planet.name}
      </div>
      <div
        style={{
          color: "rgba(255,255,255,0.55)",
          fontSize: "11px",
          fontFamily: "monospace",
          marginTop: "2px",
        }}
      >
        ⌀ {planet.diameter.toLocaleString()} km
      </div>
    </div>
  </Html>
));

export const Planet = memo(
  ({ planet, index, onSelect, isSelected }: PlanetComponentProps) => {
    const groupRef = useRef<Group>(null);
    const { timeScale } = useSimulation();
    const orbitRadius = getOrbitRadius(planet.distanceFromSun, planet.id);
    const initialAngle = (index * Math.PI * 2) / 8;
    const angleRef = useRef(initialAngle);
    const [hovered, setHovered] = useState(false);

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

    const meshProps: PlanetMeshProps = {
      planet,
      isSelected,
      onSelect,
      onHover: setHovered,
    };

    // Axial tilt applied as a static Z rotation on the inner group so the
    // self-rotation (Y axis in mesh) and orbital movement (outer group) remain
    // independent. SelectionArrow and Tooltip stay outside so they always
    // point "up" in scene coordinates regardless of tilt.
    const axialTiltRad = (planet.axialTilt * Math.PI) / 180;

    return (
      <group ref={groupRef}>
        <group rotation={[0, 0, axialTiltRad]}>
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
        </group>
        {isSelected && <SelectionArrow planet={planet} />}
        {hovered && !isSelected && <PlanetTooltip planet={planet} />}
      </group>
    );
  },
);
