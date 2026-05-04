import { useTexture } from "@react-three/drei";

interface NebulaDef {
  path: string;
  position: [number, number, number];
  scale: number;
  opacity: number;
}

const NEBULAE: NebulaDef[] = [
  {
    path: "/textures/nebulae/carina.jpg",
    position: [-180, 60, -380],
    scale: 220,
    opacity: 0.18,
  },
  {
    path: "/textures/nebulae/orion.jpg",
    position: [200, -40, -350],
    scale: 180,
    opacity: 0.15,
  },
  {
    path: "/textures/nebulae/eagle.jpg",
    position: [-60, -120, -400],
    scale: 200,
    opacity: 0.12,
  },
];

function NebulaSprite({ path, position, scale, opacity }: NebulaDef) {
  const texture = useTexture(path);
  return (
    <sprite position={position} scale={[scale, scale, 1]}>
      <spriteMaterial
        map={texture}
        transparent
        opacity={opacity}
        depthWrite={false}
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
