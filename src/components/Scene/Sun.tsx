import { useRef, Suspense, memo } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { Mesh } from "three";
import { useSimulation } from "../../context/SimulationContext";

const SUN_RADIUS = 35;
const TEXTURE_PATH = "/textures/sun.jpg";
const SUN_ROTATION_SPEED = 0.003;

// Kick off texture download before the component mounts
useTexture.preload(TEXTURE_PATH);

const SunTexturedMesh = () => {
  const meshRef = useRef<Mesh>(null);
  const texture = useTexture(TEXTURE_PATH);
  const { timeScale } = useSimulation();

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += SUN_ROTATION_SPEED * timeScale * delta * 60;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <sphereGeometry args={[SUN_RADIUS, 64, 64]} />
      <meshStandardMaterial
        map={texture}
        emissiveMap={texture}
        emissive="#FDB813"
        emissiveIntensity={0.6}
        toneMapped={false}
      />
    </mesh>
  );
};

const SunFallbackMesh = () => (
  <mesh position={[0, 0, 0]}>
    <sphereGeometry args={[SUN_RADIUS, 64, 64]} />
    <meshBasicMaterial color="#FDB813" toneMapped={false} />
  </mesh>
);

export const Sun = memo(() => (
  <Suspense fallback={<SunFallbackMesh />}>
    <SunTexturedMesh />
  </Suspense>
));
