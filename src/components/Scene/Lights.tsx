import { memo } from "react";

export const Lights = memo(() => {
  return (
    <>
      {/* Ambient light — main brightness source, keeps texture colors vivid */}
      <ambientLight intensity={1.8} />

      {/* Point light at Sun position — primary source, simulates solar radiation */}
      <pointLight
        position={[0, 0, 0]}
        intensity={3}
        distance={5000}
        decay={0.8}
        color="#fff5e0"
      />

      {/* Fill light — prevents fully-black backsides; covers the outer system */}
      <pointLight
        position={[300, 150, -300]}
        intensity={0.8}
        color="#ffffff"
        distance={4000}
        decay={0.6}
      />

      {/* Second fill from below-left for planets on the far side of the Sun */}
      <pointLight
        position={[-300, -100, 300]}
        intensity={0.6}
        color="#ffffff"
        distance={4000}
        decay={0.6}
      />
    </>
  );
});
