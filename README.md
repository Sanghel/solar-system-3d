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
