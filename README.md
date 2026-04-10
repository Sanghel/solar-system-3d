# Solar System 3D

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)](https://solar-system-3d-opal.vercel.app)

An interactive 3D visualization of the Solar System built with React, Three.js, and Vite. Explore all 8 planets, learn their key data, and navigate through space with smooth camera animations.

**Live demo:** https://solar-system-3d-opal.vercel.app

## Features

- **Interactive 3D scene** — click any planet to fly the camera to it
- **Planet info panel** — diameter, temperature, distance from Sun, satellites, orbital speed and a fun fact per planet
- **Time controls** — pause, play, and adjust simulation speed (0.1× to 10×)
- **Planet navigation** — quick-access sidebar to jump between planets
- **Realistic textures** — high-resolution JPG maps for all planets and the Sun
- **Saturn's rings** — two-layer ring system with transparency
- **Hover tooltips** — planet name and diameter on hover
- **Responsive layout** — adapts to mobile and desktop viewports
- **Error boundary** — friendly error screen if something goes wrong

## Technologies

| Technology | Version | Role |
|---|---|---|
| [React](https://react.dev) | 19 | UI layer and component model |
| [TypeScript](https://www.typescriptlang.org) | 6 | Type safety across the codebase |
| [Vite](https://vite.dev) | 8 | Dev server and production bundler |
| [Three.js](https://threejs.org) | 0.174 | 3D rendering engine |
| [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) | 9 | React renderer for Three.js |
| [Drei](https://github.com/pmndrs/drei) | 10 | Helpers for React Three Fiber |
| [pnpm](https://pnpm.io) | 10 | Fast, disk-efficient package manager |

## Installation

### Prerequisites

- **Node.js** v20.19+ or v22.12+
- **pnpm** v10+

### Setup

```bash
# Clone the repository
git clone https://github.com/Sanghel/solar-system-3d.git
cd solar-system-3d

# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Available Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start development server with HMR |
| `pnpm build` | Type-check and build for production |
| `pnpm preview` | Preview the production build locally |
| `pnpm lint` | Run ESLint |

## Project Structure

```
solar-system-3d/
├── public/
│   ├── favicon.svg
│   └── textures/           # Planet and Sun JPG texture maps
├── src/
│   ├── components/
│   │   ├── Scene/          # 3D components (Canvas, Planet, Sun, Orbit…)
│   │   └── UI/             # Interface components (PlanetInfo, Navigation…)
│   ├── context/
│   │   └── SimulationContext.tsx  # Global time scale and pause state
│   ├── data/
│   │   └── planets.ts      # Planet data (size, distance, texture, fun facts…)
│   ├── hooks/
│   │   ├── useCameraAnimation.ts  # Smooth camera fly-to logic
│   │   └── usePlanetSelection.ts  # Selection state management
│   ├── styles/
│   │   └── global.css      # CSS custom properties and base styles
│   ├── types/
│   │   └── planet.ts       # Planet TypeScript interface
│   ├── utils/
│   │   └── orbitUtils.ts   # Orbit radius calculation helpers
│   ├── App.tsx             # Root component
│   └── main.tsx            # Entry point
├── plan/
│   └── plan.md             # Development roadmap
└── vite.config.ts
```

## Performance

The application is split into separate chunks so the browser can cache vendor libraries independently of app code:

| Chunk | Gzip size | Notes |
|---|---|---|
| `vendor-r3f` | ~304 kB | Three.js + R3F + Drei — long-term cached |
| `index` | ~6 kB | App entry point |
| `PlanetInfo` | ~1 kB | Lazy-loaded on first planet selection |
| `PlanetNavigation` | ~1 kB | Lazy-loaded on first render |
| `TimeControl` | ~1 kB | Lazy-loaded on first render |

Key optimizations: `React.memo` on all components, `useCallback`/`useMemo` for stable references, `useTexture.preload()` for early texture fetching, and manual chunk splitting via Vite.

## Development

### Git Workflow

| Branch | Purpose |
|---|---|
| `main` | Production-ready code |
| `develop` | Integration branch for features |
| `feature/[issue]-[description]` | Individual feature branches |

Each feature is developed on its own branch, reviewed via PR into `develop`, then batched into a phase PR into `main`.

### Conventions

- Components use **named exports**
- Lazy-loaded components resolve through `.then(m => ({ default: m.Component }))`
- All components that receive stable props are wrapped with `React.memo`
- CSS custom properties are defined in `src/styles/global.css`

## License

MIT — see [LICENSE](LICENSE) for details.

## Author

Created by **Sanghel González** as a professional portfolio project.
