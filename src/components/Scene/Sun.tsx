import { useRef, Suspense } from "react";
import { useTexture } from "@react-three/drei";
import { Mesh } from "three";

const SUN_RADIUS = 35;
const TEXTURE_PATH = "/textures/sun.jpg";

const SunTexturedMesh = () => {
  const meshRef = useRef<Mesh>(null);
  const texture = useTexture(TEXTURE_PATH);

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

export const Sun = () => (
  <Suspense fallback={<SunFallbackMesh />}>
    <SunTexturedMesh />
  </Suspense>
);
