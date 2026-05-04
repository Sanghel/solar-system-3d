import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";
import { StarField } from "./StarField";
import { Nebula } from "./Nebula";
import { Constellations } from "./Constellations";

// Follows the camera position every frame so background elements are always
// at the same angular distance from the viewer — no parallax when orbiting
// and nebulae never end up in front of the solar system when zoomed out.
export const BackgroundScene = () => {
  const groupRef = useRef<Group>(null);

  useFrame(({ camera }) => {
    groupRef.current?.position.copy(camera.position);
  });

  return (
    <group ref={groupRef}>
      <StarField />
      <Nebula />
      <Constellations />
    </group>
  );
};
