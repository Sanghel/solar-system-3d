import { useRef } from 'react';
import { Mesh } from 'three';

export const Sun = () => {
  const meshRef = useRef<Mesh>(null);

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <sphereGeometry args={[35, 64, 64]} />
      <meshBasicMaterial color="#FDB813" toneMapped={false} />
    </mesh>
  );
};
