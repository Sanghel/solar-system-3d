export const Lights = () => {
  return (
    <>
      {/* Ambient light - enough to see dark sides of planets without washing out textures */}
      <ambientLight intensity={0.15} />

      {/* Point light at Sun position - primary source, simulates solar radiation */}
      <pointLight
        position={[0, 0, 0]}
        intensity={3}
        distance={2000}
        decay={1.5}
        color="#fff5e0"
      />

      {/* Subtle fill light from behind to prevent fully-black backsides */}
      <pointLight
        position={[200, 100, -200]}
        intensity={0.1}
        color="#6699ff"
        distance={800}
      />
    </>
  );
};
