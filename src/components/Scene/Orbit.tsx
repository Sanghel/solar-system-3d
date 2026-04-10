import { useMemo, memo } from "react";
import { Line } from "@react-three/drei";
import type { Vector3 } from "@react-three/fiber";

interface OrbitProps {
  radius: number;
  segments?: number;
  color?: string;
  opacity?: number;
}

/**
 * Renders a circular orbit line around the Sun at y=0.
 */
export const Orbit = memo(({
  radius,
  segments = 128,
  color = "#ffffff",
  opacity = 0.15,
}: OrbitProps) => {
  const points = useMemo<Vector3[]>(() => {
    return Array.from({ length: segments + 1 }, (_, i) => {
      const angle = (i / segments) * Math.PI * 2;
      return [radius * Math.cos(angle), 0, radius * Math.sin(angle)];
    });
  }, [radius, segments]);

  return (
    <Line
      points={points}
      color={color}
      lineWidth={0.5}
      transparent
      opacity={opacity}
    />
  );
});
