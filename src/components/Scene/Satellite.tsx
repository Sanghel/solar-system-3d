import { memo, useRef, Suspense, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture, Html } from "@react-three/drei";
import { Group } from "three";
import type { Satellite as SatelliteType } from "../../types/planet";
import { useSimulation } from "../../context/SimulationContext";

interface SatelliteProps {
  satellite: SatelliteType;
  /** Parent planet's relativeSize — scales the orbitRadius and selected scale */
  planetSize: number;
  /** When true the satellite is rendered larger and orbit rings are shown */
  isSelected?: boolean;
}

interface SatelliteMeshProps {
  satellite: SatelliteType;
  onHover?: (hovered: boolean) => void;
}

/** Inner mesh that loads and applies the satellite texture via Suspense. */
const SatelliteTexturedMesh = ({ satellite, onHover }: SatelliteMeshProps) => {
  const texture = useTexture(satellite.texturePath!);
  return (
    <mesh
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
      <sphereGeometry args={[satellite.size, 16, 16]} />
      <meshStandardMaterial map={texture} metalness={0.1} roughness={0.7} />
    </mesh>
  );
};

/** Fallback mesh rendered while texture is loading or when no texture is provided. */
const SatelliteFallbackMesh = ({ satellite, onHover }: SatelliteMeshProps) => (
  <mesh
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
  const angleRef = useRef<number>(Math.random() * Math.PI * 2);
  const groupRef = useRef<Group>(null);
  const { timeScale } = useSimulation();
  const [hovered, setHovered] = useState(false);

  const orbitRadius = satellite.orbitRadius * planetSize;

  // Scale proportional to planet size so moons look right relative to their planet.
  // Larger planets (Jupiter 25, Saturn 20) get a bigger boost than smaller ones (Earth 10).
  const selectedScale = Math.max(2.5, planetSize * 0.15);
  const scale = isSelected ? selectedScale : 1;

  useFrame((_, delta) => {
    angleRef.current += satellite.orbitSpeed * timeScale * delta * 60;
    if (groupRef.current) {
      groupRef.current.position.set(
        orbitRadius * Math.cos(angleRef.current),
        0,
        orbitRadius * Math.sin(angleRef.current),
      );
    }
  });

  return (
    // groupRef drives the orbital position; scale is applied to an inner group
    // so the tooltip Html can sit in unscaled local space for correct positioning.
    <group ref={groupRef}>
      <group scale={scale}>
        {satellite.texturePath ? (
          <Suspense fallback={<SatelliteFallbackMesh satellite={satellite} onHover={setHovered} />}>
            <SatelliteTexturedMesh satellite={satellite} onHover={setHovered} />
          </Suspense>
        ) : (
          <SatelliteFallbackMesh satellite={satellite} onHover={setHovered} />
        )}
      </group>
      {hovered && (
        <Html
          center
          position={[0, satellite.size * scale + 0.4, 0]}
          style={{ pointerEvents: "none" }}
        >
          <div
            style={{
              background: "rgba(8, 14, 30, 0.92)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "8px",
              padding: "4px 10px",
              backdropFilter: "blur(10px)",
              whiteSpace: "nowrap",
              textAlign: "center",
              userSelect: "none",
            }}
          >
            <div
              style={{
                color: "#ffffff",
                fontWeight: 700,
                fontSize: "12px",
                letterSpacing: "0.04em",
              }}
            >
              {satellite.name}
            </div>
          </div>
        </Html>
      )}
    </group>
  );
});
