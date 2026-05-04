import { Line } from "@react-three/drei";

const R = 450;

function toXYZ(ra: number, dec: number): [number, number, number] {
  const r = (ra * Math.PI) / 180;
  const d = (dec * Math.PI) / 180;
  return [
    R * Math.cos(d) * Math.cos(r),
    R * Math.sin(d),
    -R * Math.cos(d) * Math.sin(r),
  ];
}

interface ConstellationDef {
  name: string;
  // Each star: [ra_deg, dec_deg]
  stars: [number, number][];
  // Each segment: pair of star indices
  segments: [number, number][];
}

const CONSTELLATIONS: ConstellationDef[] = [
  {
    name: "Orion",
    stars: [
      [88.79, 7.41],   // 0 Betelgeuse
      [81.28, 6.35],   // 1 Bellatrix
      [83.0, -0.3],    // 2 Mintaka
      [84.05, -1.2],   // 3 Alnilam
      [85.19, -1.94],  // 4 Alnitak
      [78.63, -8.2],   // 5 Rigel
      [86.94, -9.67],  // 6 Saiph
      [83.78, 9.93],   // 7 Meissa
    ],
    segments: [
      [7, 0], [7, 1], [0, 1],   // head & shoulders
      [0, 4], [1, 2],           // body sides
      [2, 3], [3, 4],           // belt
      [2, 5], [4, 6],           // feet
    ],
  },
  {
    name: "Cassiopeia",
    stars: [
      [2.29, 59.15],   // 0 Caph
      [10.13, 56.54],  // 1 Schedar
      [14.18, 60.72],  // 2 γ Cas
      [21.45, 60.24],  // 3 Ruchbah
      [28.6, 63.67],   // 4 Segin
    ],
    segments: [[0, 1], [1, 2], [2, 3], [3, 4]],
  },
  {
    name: "Ursa Major",
    stars: [
      [165.93, 61.75], // 0 Dubhe
      [165.46, 56.38], // 1 Merak
      [178.46, 53.69], // 2 Phecda
      [183.86, 57.03], // 3 Megrez
      [193.51, 55.96], // 4 Alioth
      [200.98, 54.93], // 5 Mizar
      [206.89, 49.31], // 6 Alkaid
    ],
    segments: [
      [0, 1], [1, 2], [2, 3], [3, 0], // bowl
      [3, 4], [4, 5], [5, 6],          // handle
    ],
  },
  {
    name: "Crux",
    stars: [
      [186.65, -63.1],  // 0 Acrux
      [187.79, -57.11], // 1 Gacrux
      [191.93, -59.69], // 2 Mimosa
      [183.79, -58.75], // 3 δ Cru
    ],
    segments: [
      [0, 1], // vertical arm
      [2, 3], // horizontal arm
    ],
  },
  {
    name: "Scorpius",
    stars: [
      [241.36, -19.81], // 0 Graffias
      [240.08, -22.62], // 1 δ Sco
      [247.35, -26.43], // 2 Antares
      [245.3, -25.59],  // 3 σ Sco
      [248.97, -28.22], // 4 τ Sco
      [252.54, -34.29], // 5 ε Sco
      [252.97, -38.05], // 6 μ Sco
      [253.08, -42.36], // 7 ζ Sco
      [254.65, -43.24], // 8 η Sco
      [264.33, -42.99], // 9 θ Sco
      [263.4, -37.1],   // 10 Shaula
    ],
    segments: [
      [0, 1], [1, 2], [2, 3], [3, 4], // head
      [2, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 10], // tail
    ],
  },
  {
    name: "Leo",
    stars: [
      [152.09, 11.97], // 0 Regulus
      [177.26, 14.57], // 1 Denebola
      [154.99, 19.84], // 2 Algieba
      [168.53, 20.52], // 3 Zosma
      [146.46, 23.77], // 4 Ras Elased
      [154.17, 23.42], // 5 Adhafera
      [151.83, 16.76], // 6 η Leo
    ],
    segments: [
      [4, 5], [5, 2], [2, 6], [6, 0], // sickle (head)
      [0, 3], [3, 1],                  // body & tail
      [2, 3],
    ],
  },
  {
    name: "Lyra",
    stars: [
      [279.23, 38.78], // 0 Vega
      [282.52, 33.36], // 1 Sheliak
      [284.74, 32.69], // 2 Sulafat
      [281.19, 36.9],  // 3 δ Lyr
      [283.43, 37.6],  // 4 ζ Lyr
    ],
    segments: [
      [0, 3], [0, 4],         // Vega to parallelogram
      [3, 1], [4, 2], [1, 2], // parallelogram
    ],
  },
  {
    name: "Cygnus",
    stars: [
      [310.36, 45.28], // 0 Deneb
      [292.68, 27.96], // 1 Albireo
      [305.56, 40.26], // 2 Sadr
      [296.24, 45.13], // 3 δ Cyg
      [311.55, 33.97], // 4 ε Cyg
    ],
    segments: [
      [0, 2], [2, 1], // vertical bar
      [3, 2], [2, 4], // horizontal bar
    ],
  },
  {
    name: "Perseus",
    stars: [
      [51.08, 49.86],  // 0 Mirfak
      [47.04, 40.96],  // 1 Algol
      [39.92, 53.5],   // 2 γ Per
      [43.56, 47.79],  // 3 δ Per
      [57.16, 39.89],  // 4 ε Per
      [57.15, 31.88],  // 5 ζ Per
      [42.67, 55.9],   // 6 η Per
    ],
    segments: [
      [6, 2], [2, 3], [3, 0], [0, 1], // spine
      [0, 4], [4, 5],                  // arm
    ],
  },
  {
    name: "Gemini",
    stars: [
      [113.65, 31.89], // 0 Castor
      [116.33, 28.03], // 1 Pollux
      [99.43, 16.4],   // 2 Alhena
      [110.03, 21.98], // 3 Wasat
      [100.98, 25.13], // 4 Mebsuda
      [93.72, 22.51],  // 5 Propus
      [95.74, 22.51],  // 6 Tejat
    ],
    segments: [
      [0, 1],                // heads
      [0, 3], [3, 2],        // Castor's leg
      [1, 3], [3, 4], [4, 6], [6, 5], // Pollux's leg
    ],
  },
  {
    name: "Taurus",
    stars: [
      [68.98, 16.51],  // 0 Aldebaran
      [81.57, 28.61],  // 1 Elnath (β Tau)
      [67.16, 15.63],  // 2 γ Tau
      [65.73, 17.54],  // 3 δ Tau
      [67.15, 19.18],  // 4 ε Tau
      [84.41, 21.14],  // 5 ζ Tau
      [56.87, 24.1],   // 6 Alcyone (Pleiades)
    ],
    segments: [
      [3, 4], [4, 2], [2, 0], [0, 3], // V-shape face
      [0, 1], [1, 5],                  // horn
      [4, 6],                          // toward Pleiades
    ],
  },
  {
    name: "Aquila",
    stars: [
      [297.7, 8.87],   // 0 Altair
      [298.83, 6.41],  // 1 Alshain
      [296.56, 10.61], // 2 Tarazed
      [300.66, 13.86], // 3 ζ Aql
      [296.47, 3.11],  // 4 δ Aql
      [298.1, 1.01],   // 5 η Aql
      [306.41, -0.82], // 6 θ Aql
    ],
    segments: [
      [2, 0], [0, 1],         // main trio
      [0, 3],                  // upward
      [0, 4], [4, 5], [5, 6], // downward tail
    ],
  },
];

export const Constellations = () => {
  return (
    <>
      {CONSTELLATIONS.flatMap((constellation) =>
        constellation.segments.map(([a, b], i) => (
          <Line
            key={`${constellation.name}-${i}`}
            points={[
              toXYZ(...constellation.stars[a]),
              toXYZ(...constellation.stars[b]),
            ]}
            color="#ffffff"
            lineWidth={0.4}
            transparent
            opacity={0.3}
          />
        ))
      )}
    </>
  );
};
