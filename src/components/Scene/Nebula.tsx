import { useTexture } from "@react-three/drei";
import { AdditiveBlending } from "three";

interface NebulaDef {
  path: string;
  position: [number, number, number];
  scale: number;
  opacity: number;
}

// Additive blending makes black pixels (value=0) invisible, so only the
// bright nebula gas blends naturally into the scene without rectangular edges.
const NEBULAE: NebulaDef[] = [
  {
    path: "/textures/nebulae/carina.jpg",
    position: [-180, 60, -380],
    scale: 280,
    opacity: 0.55,
  },
  {
    path: "/textures/nebulae/orion.jpg",
    position: [220, -30, -350],
    scale: 240,
    opacity: 0.45,
  },
  {
    path: "/textures/nebulae/eagle.jpg",
    position: [-50, -100, -400],
    scale: 260,
    opacity: 0.4,
  },
];

function NebulaSprite({ path, position, scale, opacity }: NebulaDef) {
  const texture = useTexture(path);
  return (
    <sprite position={position} scale={[scale, scale, 1]}>
      <spriteMaterial
        map={texture}
        blending={AdditiveBlending}
        opacity={opacity}
        depthWrite={false}
        transparent
      />
    </sprite>
  );
}

export const Nebula = () => {
  return (
    <>
      {NEBULAE.map((n) => (
        <NebulaSprite key={n.path} {...n} />
      ))}
    </>
  );
};
