# Solar System 3D

An interactive 3D visualization of the Solar System built with React, Three.js, and Vite.

## Description

This project creates a beautiful, interactive 3D model of the Solar System where users can explore planets, learn about their characteristics, and navigate through space using intuitive controls.

## Technologies

- **React 19** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **Three.js** - 3D graphics library
- **React Three Fiber** - React renderer for Three.js
- **Drei** - Useful helpers for React Three Fiber
- **pnpm** - Fast, disk space efficient package manager

## Installation

### Prerequisites
- Node.js v20.19+ or v22.12+
- pnpm v10+

### Setup

1. Clone the repository:
```bash
git clone https://github.com/Sanghel/solar-system-3d.git
cd solar-system-3d
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm dev
```

The application will be available at `http://localhost:5173`

## Available Scripts

- `pnpm dev` - Start development server with HMR
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build locally
- `pnpm lint` - Run ESLint

## Project Structure

```
src/
├── components/       # React components
│   ├── Scene/       # 3D scene components
│   └── UI/          # UI interface components
├── data/            # Static data (planet information)
├── types/           # TypeScript type definitions
├── utils/           # Utility functions
├── hooks/           # Custom React hooks
├── App.tsx          # Main App component
├── main.tsx         # Entry point
└── index.css        # Global styles
```

## Performance

The application is optimized for fast load times and smooth 60 FPS rendering:

### Bundle splitting
| Chunk | Size (gzip) | Notes |
|-------|-------------|-------|
| `vendor-r3f` | 304 kB | Three.js + R3F + Drei — cached indefinitely |
| `index` | 6 kB | App entry point |
| `PlanetInfo` | 0.94 kB | Lazy-loaded on first planet selection |
| `PlanetNavigation` | 0.57 kB | Lazy-loaded on first render |
| `TimeControl` | 0.53 kB | Lazy-loaded on first render |

### Rendering optimizations
- `React.memo` on all components to prevent unnecessary re-renders
- `useCallback` / `useMemo` to stabilize references and avoid breaking memoization
- `React.lazy` + `Suspense` for UI panels (code-split from the 3D engine)
- `useTexture.preload()` kicks off all planet texture downloads at module load time
- Named Three.js imports (`import { Vector3 }`) instead of namespace imports for tree-shaking

---

## Development

This project follows a structured Git Flow workflow with organized phases for development:

### Git Workflow
- `main` - Production-ready code
- `develop` - Integration branch for features
- `feature/[issue-number]-[description]` - Individual feature branches

See the project plan for detailed development phases.

## Features (In Development)

- Interactive 3D Solar System visualization
- Planet selection with detailed information panels
- Realistic planet textures and proportions
- Smooth camera navigation and animations
- Orbital mechanics and planet rotations
- Time control (pause, play, speed adjustment)
- Responsive design for different screen sizes

## License

This project is open source.

## Author

Created as a professional portfolio project.
