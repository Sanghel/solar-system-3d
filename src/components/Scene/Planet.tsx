import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import { Planet as PlanetType } from '../../types/planet';

interface PlanetComponentProps {
  planet: PlanetType;
}

export const Planet = ({ planet }: PlanetComponentProps) => {
  const meshRef = useRef<Mesh>(null);

  // Calculate position on orbit (X-Z plane)
  const orbitRadius = Math.log(planet.distanceFromSun) / 15;
  const position = useMemo(
    () => [orbitRadius * Math.cos(Math.random()), 0, orbitRadius * Math.sin(Math.random())] as [
      number,
      number,
      number,
    ],
    [orbitRadius]
  );

  // Rotation animation
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += planet.rotationSpeed;
    }
  });

  return (
    <mesh ref={meshRef} position={position} name={planet.id}>
      <sphereGeometry args={[planet.relativeSize, 32, 32]} />
      <meshStandardMaterial
        color={planet.baseColor}
        metalness={0.3}
        roughness={0.7}
      />
    </mesh>
  );
};
