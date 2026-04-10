/**
 * Manually tuned visual orbit radii (in scene units) that guarantee
 * no planet mesh overlaps — including Saturn's ring system.
 *
 * Spacing logic:
 *  - Each gap ≥ (prev planet radius + next planet radius + min clearance)
 *  - Jupiter–Saturn gap accounts for Saturn's ring outer radius (20 * 2.2 = 44)
 *  - Saturn–Uranus gap starts from Saturn's ring outer edge
 */
const VISUAL_ORBIT_RADII: Record<string, number> = {
  mercury: 60,
  venus:   95,
  earth:   130,
  mars:    165,
  jupiter: 225,
  saturn:  325,  // ring outer edge ≈ 325 + 44 = 369; Jupiter surface ≈ 250 → clear gap
  uranus:  415,  // Uranus inner surface ≈ 400; Saturn ring outer ≈ 369 → gap 31
  neptune: 490,  // Neptune inner surface ≈ 475; Uranus outer ≈ 430 → gap 45
};

/**
 * Returns the visual orbit radius for a planet.
 * Uses explicit well-spaced radii keyed by planetId when available,
 * with a logarithmic fallback for unknown bodies.
 */
export function getOrbitRadius(distanceFromSun: number, planetId?: string): number {
  if (planetId && VISUAL_ORBIT_RADII[planetId] !== undefined) {
    return VISUAL_ORBIT_RADII[planetId];
  }
  // Fallback for unknown planets (keeps formula-based spacing)
  return Math.pow(Math.log10(distanceFromSun + 1), 1.8) * 3;
}
