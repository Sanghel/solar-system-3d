import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { ReactNode } from 'react';

interface SolarSystemCanvasProps {
  children?: ReactNode;
}

export const SolarSystemCanvas = ({ children }: SolarSystemCanvasProps) => {
  return (
    <Canvas
      camera={{
        position: [0, 50, 100],
        fov: 75,
        near: 0.1,
        far: 100000,
      }}
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      {/* Black space background */}
      <color attach="background" args={['#000000']} />

      {/* Orbit Controls for camera navigation */}
      <OrbitControls
        enableDamping
        dampingFactor={0.05}
        autoRotate
        autoRotateSpeed={0.5}
        minDistance={50}
        maxDistance={500}
      />

      {/* Children components will be rendered here */}
      {children}
    </Canvas>
  );
};
