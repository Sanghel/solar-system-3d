import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { DoubleSide } from "three";
import type { Mesh } from "three";

// Derive alpha from pixel luminance so dark/non-black areas of the JPG become
// transparent — only the bright nebula gas is visible with natural soft edges.
const VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const FRAG = /* glsl */ `
  uniform sampler2D map;
  uniform float opacity;
  varying vec2 vUv;
  void main() {
    vec4 texel = texture2D(map, vUv);
    float lum = dot(texel.rgb, vec3(0.299, 0.587, 0.114));
    // Power curve: dark areas → transparent, bright gas → visible
    float alpha = pow(max(lum - 0.08, 0.0) * (1.0 / 0.92), 1.4) * opacity;
    gl_FragColor = vec4(texel.rgb * opacity, clamp(alpha, 0.0, opacity));
  }
`;

interface NebulaDef {
  path: string;
  position: [number, number, number];
  scale: number;
  opacity: number;
}

// Positioned at ~470 units from origin (past the starfield sphere at r=300)
const NEBULAE: NebulaDef[] = [
  {
    path: "/textures/nebulae/carina.jpg",
    position: [-210, 90, -420],
    scale: 160,
    opacity: 0.7,
  },
  {
    path: "/textures/nebulae/orion.jpg",
    position: [250, -55, -415],
    scale: 140,
    opacity: 0.65,
  },
  {
    path: "/textures/nebulae/eagle.jpg",
    position: [-85, -155, -435],
    scale: 150,
    opacity: 0.6,
  },
];

function NebulaPlane({ path, position, scale, opacity }: NebulaDef) {
  const ref = useRef<Mesh>(null);
  const texture = useTexture(path);
  const uniforms = useMemo(
    () => ({ map: { value: texture }, opacity: { value: opacity } }),
    [texture, opacity]
  );

  // Copy camera quaternion each frame so the plane always faces the viewer
  useFrame(({ camera }) => {
    ref.current?.quaternion.copy(camera.quaternion);
  });

  return (
    <mesh ref={ref} position={position}>
      <planeGeometry args={[scale, scale]} />
      <shaderMaterial
        vertexShader={VERT}
        fragmentShader={FRAG}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        side={DoubleSide}
      />
    </mesh>
  );
}

export const Nebula = () => (
  <>
    {NEBULAE.map((n) => (
      <NebulaPlane key={n.path} {...n} />
    ))}
  </>
);
