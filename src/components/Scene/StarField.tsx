import { Stars } from "@react-three/drei";

const isMobile = window.innerWidth < 768;

export const StarField = () => {
  return (
    <Stars
      radius={300}
      depth={60}
      count={isMobile ? 2000 : 6000}
      factor={4}
      saturation={0}
      fade={false}
    />
  );
};
