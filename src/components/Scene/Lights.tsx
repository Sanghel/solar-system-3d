export const Lights = () => {
  return (
    <>
      {/* Ambient light - soft overall illumination */}
      <ambientLight intensity={0.4} />

      {/* Point light at Sun position - primary light source */}
      <pointLight
        position={[0, 0, 0]}
        intensity={2}
        distance={1000}
        decay={2}
      />

      {/* Additional subtle light for backlighting */}
      <pointLight
        position={[200, 100, -200]}
        intensity={0.3}
        color="#6699ff"
        distance={500}
      />
    </>
  );
};
