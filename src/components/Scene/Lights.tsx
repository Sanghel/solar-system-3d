import { memo } from "react";

export const Lights = memo(() => {
  return (
    <>
      {/* Ambient light — raised so dark sides of all planets are visible */}
      <ambientLight intensity={0.45} />

      {/* Point light at Sun position — primary source, simulates solar radiation */}
      <pointLight
        position={[0, 0, 0]}
        intensity={3}
        distance={5000}
        decay={1.2}
        color="#fff5e0"
      />

      {/* Fill light — prevents fully-black backsides; covers the outer system */}
      <pointLight
        position={[300, 150, -300]}
        intensity={0.5}
        color="#8aaeff"
        distance={2500}
        decay={1}
      />

      {/* Second fill from below-left for planets on the far side of the Sun */}
      <pointLight
        position={[-300, -100, 300]}
        intensity={0.35}
        color="#ffffff"
        distance={2500}
        decay={1}
      />
    </>
  );
});
