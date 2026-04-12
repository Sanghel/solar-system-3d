# Changelog

All notable changes to Solar System 3D are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

---

## [Unreleased]

---

## [1.1.0] — 2026-04-12

### Added
- **Favicon** redesigned as a Saturn-style planet with rings (SVG, `clipPath` layering technique)
- **Axial tilt** applied to all planets using real astronomical values (Earth 23.4°, Uranus 97.8°, etc.)
- **Satellite system**: famous moons orbit their parent planets with textures
  - Luna (Earth), Io, Europa, Ganymede, Callisto (Jupiter), Titan (Saturn), Triton (Neptune)
  - Phobos, Deimos, Enceladus, Rhea, Titania, Oberon rendered with solid-color fallback
  - 7 texture files sourced from Solar System Scope (CC BY 4.0) and USGS/NASA (public domain)
- **Satellite orbit rings** visible when a planet is selected (planet `baseColor` at 25% opacity)
- **Satellite scaling** when planet is selected — proportional to planet size (`Math.max(2.5, planetSize × 0.15)`)
- **Satellite tooltips** on hover showing moon name
- **"Known Moons" section** in the planet info panel listing rendered satellites
- **Camera orbit tracking**: after fly-to, camera follows the planet along its orbit maintaining angle and distance
- **Smooth camera alignment**: exponential ease-out closes the fly-to gap over ~0.5 s instead of snapping
- **FloatingMenuButton** (FAB): circular button in bottom-right corner, mobile-only
  - Drawer mode (no planet selected): opens/closes planet list
  - Panel mode (planet selected): shows/hides info panel without deselecting
- **PlanetDrawer**: slide-up panel on mobile with full planet list and color indicators
- `useIsMobile` hook for reactive mobile breakpoint detection

### Fixed
- Rotation direction corrected for Venus and Uranus (retrograde — negative `rotationSpeed`)
- Unused `Satellite` import in `planets.ts` causing TypeScript build error on Vercel

### Changed
- **Mobile info panel**: decoupled from planet selection — FAB toggles panel visibility independently
- **LoadingOverlay** moved outside R3F Canvas via `createPortal` — Lighthouse now detects it as real DOM FCP
- Pre-React loading indicator added to `index.html` for instant FCP before JS downloads
- Satellite textures excluded from module-level preload (~800 KB deferred until planet selected)
- Planet sphere segments: 32 (desktop) / 24 (mobile)
- Satellite sphere segments: 16 (desktop) / 8 (mobile)
- On mobile: only textured satellites rendered (plain-color moons omitted)
- Canvas `dpr={[1, 2]}` to cap pixel density on high-DPR screens

---

## [1.0.1] — 2026-04-11

### Fixed
- Attribution padding-top on mobile to avoid overlap with Header title

---

## [0.11.0] — 2026-04-10 — Deploy en Vercel

### Added
- `vercel.json` configuration file for Vercel deployment (build: `pnpm build`, output: `dist`, framework: `vite`)
- Project linked to Vercel with automatic GitHub integration for continuous deployment
- No environment variables required (confirmed)
- Production deployment live at https://solar-system-3d-opal.vercel.app
- Vercel deployment badge in README
- Production URL documented in README and repository description

---

## [0.10.0] — 2025-04-10 — Documentation & Deploy prep

### Added
- Full README rewrite with features, tech table, project structure, performance metrics and conventions
- `LICENSE` file (MIT)
- `.env.example` documenting that no environment variables are required
- JSDoc comments on the `Planet` interface and `SimulationContextValue`
- `CHANGELOG.md` (this file)

### Changed
- Improved planet brightness: higher ambient light (`1.8`), reduced point-light decay, removed white emissive wash on selection

---

## [0.9.0] — 2025-04-10 — Performance optimizations

### Added
- `ErrorBoundary` component with user-friendly error screen and Reload button
- `useTexture.preload()` for all planet textures at module load time
- `<link rel="preload">` hint for the Sun texture in `index.html`

### Changed
- All components wrapped with `React.memo` to prevent unnecessary re-renders
- `handleOverview` and `planetsToRender` stabilised with `useCallback`/`useMemo` in `App.tsx`
- Camera config memoised in `SolarSystemCanvas`
- `PlanetInfo`, `PlanetNavigation` and `TimeControl` are now lazy-loaded with `React.lazy`
- Vite `manualChunks` splits vendor libs from app code (main bundle: 1 124 kB → 17 kB)
- `import * as THREE` replaced with named imports for better tree-shaking

### Removed
- Unused `src/utils/textureLoader.ts`

---

## [0.8.0] — 2025-04-09 — UI polish

### Added
- `Header` component with app title and tagline
- Hover tooltips on planets showing name and diameter
- Cursor pointer on planet hover
- Staggered navigation animation on load
- Mobile-responsive UI controls layout

### Changed
- Page `<title>` updated to "Solar System 3D"
- Added `color-scheme` and `description` meta tags
- `will-change` hints on animated elements for GPU acceleration

---

## [0.7.0] — Camera navigation

### Added
- Smooth camera fly-to animation when selecting a planet (`useCameraAnimation`)
- `CameraController` component driving transitions inside the Canvas
- Overview reset button and trigger

---

## [0.6.0] — Orbits & animations

### Added
- Elliptical orbit lines rendered with `<Line>` from Drei
- Continuous orbital motion for all planets using `useFrame`
- Saturn ring system (two-layer, tilted)
- Selection arrow indicator above selected planet

---

## [0.5.0] — Textures

### Added
- High-resolution JPG texture maps for all 8 planets and the Sun
- `useTexture` loading via Drei with `Suspense` fallback meshes
- Loading screen with progress indicator

---

## [0.4.0] — Planet info panel & time control

### Added
- `PlanetInfo` slide-out panel with physical data, motion data and fun fact
- `TimeControl` UI with play/pause and speed slider (0.1× – 10×)
- `SimulationContext` for global time scale state
- `PlanetNavigation` sidebar for quick planet switching

---

## [0.3.0] — Basic solar system scene

### Added
- Sun mesh with emissive material
- Planet meshes with base colours and proportional sizes
- Point lights simulating solar radiation
- `OrbitControls` for camera navigation

---

## [0.2.0] — Project setup

### Added
- React 19 + TypeScript + Vite scaffold
- React Three Fiber and Drei installed
- `planets.ts` data file with all 8 planets and the Sun
- `Planet` TypeScript interface

---

## [0.1.0] — Initial commit

### Added
- Repository initialised with Vite + React + TypeScript template
- pnpm as package manager
- ESLint configuration
