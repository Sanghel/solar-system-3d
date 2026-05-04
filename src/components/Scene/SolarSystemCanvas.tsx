import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef, useMemo } from "react";
import type { ReactNode } from "react";
import { Mesh } from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { CameraController } from "./CameraController";
import { StarField } from "./StarField";
import { Nebula } from "./Nebula";
import { Constellations } from "./Constellations";
import type { Planet } from "../../types/planet";

interface SolarSystemCanvasProps {
  children?: ReactNode;
  onBackgroundClick?: () => void;
  selectedPlanet: Planet | null;
  overviewTrigger: number;
}

export const SolarSystemCanvas = ({
  children,
  onBackgroundClick,
  selectedPlanet,
  overviewTrigger,
}: SolarSystemCanvasProps) => {
  const backgroundRef = useRef<Mesh>(null);
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const cameraConfig = useMemo(
    () => ({ position: [0, 50, 100] as [number, number, number], fov: 75, near: 0.1, far: 100000 }),
    []
  );

  return (
    <Canvas
      camera={cameraConfig}
      dpr={[1, 2]}
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      {/* Black space background */}
      <color attach="background" args={["#000000"]} />

      {/* Space environment */}
      <StarField />
      <Nebula />
      <Constellations />

      {/* Orbit Controls for camera navigation */}
      <OrbitControls
        ref={controlsRef}
        enableDamping
        dampingFactor={0.05}
        autoRotate
        autoRotateSpeed={0.5}
        minDistance={50}
        maxDistance={650}
      />

      {/* Drives smooth camera transitions when selection changes */}
      <CameraController
        controlsRef={controlsRef}
        selectedPlanet={selectedPlanet}
        overviewTrigger={overviewTrigger}
      />

      {/* Background plane to capture deselection clicks */}
      <mesh
        ref={backgroundRef}
        position={[0, 0, -500]}
        onClick={onBackgroundClick}
      >
        <planeGeometry args={[10000, 10000]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* Children components will be rendered here */}
      {children}
    </Canvas>
  );
};
