import { useRef, useEffect } from 'react';
import { Mesh } from 'three';
import { Planet } from '../../types/planet';

interface SelectionRingProps {
  planet: Planet | null;
  planetPosition?: [number, number, number];
}

export const SelectionRing = ({ planet, planetPosition }: SelectionRingProps) => {
  const meshRef = useRef<Mesh>(null);

  useEffect(() => {
    if (meshRef.current && planet) {
      meshRef.current.scale.set(1, 1, 1);
    }
  }, [planet]);

  if (!planet || !planetPosition) return null;

  const ringRadius = planet.relativeSize * 1.5;

  return (
    <mesh ref={meshRef} position={planetPosition} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[ringRadius, ringRadius * 0.1, 16, 32]} />
      <meshBasicMaterial color="#00ff00" emissive="#00ff00" emissiveIntensity={0.8} />
    </mesh>
  );
};
