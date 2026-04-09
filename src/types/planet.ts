export interface Planet {
  id: string;
  name: string;
  diameter: number;
  distanceFromSun: number;
  temperature: number;
  numberOfSatellites: number;
  type: 'terrestrial' | 'gas-giant' | 'ice-giant' | 'dwarf' | 'star';
  funFact: string;
  baseColor: string;
  relativeSize: number;
  rotationSpeed: number;
  orbitSpeed: number;
  texture?: string;
}
