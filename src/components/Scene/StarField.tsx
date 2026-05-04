import { Stars } from "@react-three/drei";

const isMobile = window.innerWidth < 768;

export const StarField = () => {
  return (
    <>
      {/* Near layer: slightly larger, brighter stars */}
      <Stars
        radius={200}
        depth={50}
        count={isMobile ? 1500 : 5000}
        factor={3.5}
        saturation={0}
        fade={false}
      />
      {/* Far layer: fills the sphere out to constellation radius (450)
          so no dark gaps appear behind constellation lines */}
      <Stars
        radius={450}
        depth={80}
        count={isMobile ? 2000 : 7000}
        factor={2}
        saturation={0}
        fade={false}
      />
    </>
  );
};
