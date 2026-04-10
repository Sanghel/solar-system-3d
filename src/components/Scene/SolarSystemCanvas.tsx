import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import type { ReactNode } from "react";
import { Mesh } from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { CameraController } from "./CameraController";
import type { Planet } from "../../types/planet";

interface SolarSystemCanvasProps {
  children?: ReactNode;
  onBackgroundClick?: () => void;
  selectedPlanet: Planet | null;
}

export const SolarSystemCanvas = ({
  children,
  onBackgroundClick,
  selectedPlanet,
}: SolarSystemCanvasProps) => {
  const backgroundRef = useRef<Mesh>(null);
  const controlsRef = useRef<OrbitControlsImpl>(null);

  return (
    <Canvas
      camera={{
        position: [0, 50, 100],
        fov: 75,
        near: 0.1,
        far: 100000,
      }}
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      {/* Black space background */}
      <color attach="background" args={["#000000"]} />

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
