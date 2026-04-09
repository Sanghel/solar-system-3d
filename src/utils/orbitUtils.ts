/**
 * Computes the visual orbit radius for a planet given its real distance from the Sun.
 * Uses a logarithmic scale so all orbits are visible without extreme zoom.
 */
export function getOrbitRadius(distanceFromSun: number): number {
  return Math.pow(Math.log10(distanceFromSun + 1), 1.8) * 3;
}
