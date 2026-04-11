export interface Planet {
  /** Unique identifier used as the Three.js mesh name for scene lookups */
  id: string;
  /** Display name shown in the UI */
  name: string;
  /** Equatorial diameter in kilometres */
  diameter: number;
  /** Mean distance from the Sun in kilometres */
  distanceFromSun: number;
  /** Mean surface (or cloud-top) temperature in Kelvin */
  temperature: number;
  /** Number of known natural satellites */
  numberOfSatellites: number;
  /** Broad classification used to determine the nav icon */
  type: "terrestrial" | "gas-giant" | "ice-giant" | "dwarf" | "star";
  /** Short interesting fact shown at the bottom of the info panel */
  funFact: string;
  /** Hex colour used for UI accents (name label, selection glow, dot) */
  baseColor: string;
  /** Radius in scene world units — does not correspond to real scale */
  relativeSize: number;
  /** Rotation speed in radians per simulation step (negative = retrograde) */
  rotationSpeed: number;
  /** Axial tilt in degrees relative to the orbital plane */
  axialTilt: number;
  /** Orbital speed in radians per simulation step */
  orbitSpeed: number;
  /** Path to the texture file served from /public (e.g. "/textures/earth.jpg") */
  texture?: string;
}
