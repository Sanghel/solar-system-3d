# Lecciones Aprendidas — Solar System 3D

Notas personales del proceso de desarrollo de este proyecto de portafolio.

---

## Stack y tecnologías

### React Three Fiber (R3F)
- R3F abstrae Three.js en componentes React de forma muy elegante.
- La curva de aprendizaje es notable al principio: hay que entender el loop de render de Three.js (`useFrame`) y cómo difiere del ciclo de vida de React.
- `@react-three/drei` ahorra muchísimo trabajo: `OrbitControls`, `useTexture`, `Stars`, `Line`, etc., son utilidades que en Three.js puro requerirían decenas de líneas.

### TypeScript con Three.js
- Los tipos de `@types/three` son muy completos pero a veces verbosos.
- Tipar refs de Three.js (`useRef<Mesh>`, `useRef<OrbitControlsImpl>`) es esencial para no depender de `any`.

### Vite + pnpm
- El dev server de Vite es extraordinariamente rápido para proyectos con R3F.
- pnpm reduce drásticamente el espacio en disco con el store compartido.
- `manualChunks` en Vite permite separar el vendor bundle de R3F (~1.1 MB) del código de aplicación (~17 KB).

---

## Arquitectura

### Lo que funcionó bien
- Separar `Scene/` de `UI/` desde el principio mantuvo el código organizado.
- `SimulationContext` con un solo valor de tiempo hace que los controles de velocidad sean triviales de integrar.
- Lazy loading de `PlanetInfo`, `PlanetNavigation` y `TimeControl` redujo el bundle inicial.
- `React.memo` + `useCallback`/`useMemo` previenen re-renders innecesarios en el loop 3D.

### Lo que hubiera hecho diferente
- Empezar con `useTexture.preload()` desde el principio, no agregarlo en optimización tardía.
- Definir los radios de órbita en los datos (`planets.ts`), no calcularlos en tiempo de render.
- Considerar Zustand en lugar de Context para el estado global desde el inicio.

---

## Proceso y flujo de trabajo

- El flujo **issue → branch → PR → develop → PR develop/main por fase** fue muy efectivo para mantener un historial limpio y trazable.
- GitHub Actions + Vercel juntos dan un CI/CD muy sólido sin configuración compleja.
- Vercel detectó automáticamente Vite y el `pnpm-lock.yaml` sin ningún ajuste manual.

---

## Skills desarrolladas / reforzadas

- Three.js: geometrías, materiales, luces, texturas, animaciones con `useFrame`
- React Three Fiber: integración de Three.js con React, refs de Three, Suspense con 3D
- TypeScript: tipos complejos, genéricos, interfaces con discriminated unions
- Git workflow: branches por feature, squash merge, resolución de conflictos
- Deploy: Vercel CLI, GitHub Actions, GitHub Pages, Open Graph / SEO

---

## Para el próximo proyecto

- Investigar `@react-three/postprocessing` para efectos visuales (bloom, depth of field).
- Explorar Zustand para state management en apps con Three.js.
- Considerar `drei/Stars` para starfield desde el inicio — es una línea de código.
- R3F + TypeScript + Vite es un stack muy productivo para proyectos 3D en la web.
