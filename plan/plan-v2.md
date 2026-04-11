# Plan de Trabajo v2: Sistema Solar 3D — Sprint de Mejoras v1.1.0

## Información del Proyecto

- **Tipo**: Aplicación web interactiva 3D
- **Stack**: React + Vite + TypeScript + Three.js
- **Gestor de paquetes**: pnpm
- **Control de versiones**: Git + GitHub
- **Deploy**: Vercel (CI automático en merge a main)
- **Versión base**: v1.0.1 (en producción)
- **Versión objetivo**: v1.1.0

## Objetivo del Sprint

Corregir imprecisiones astronómicas (dirección de rotación e inclinación axial), enriquecer la escena 3D con satélites visuales con texturas, mejorar la experiencia en mobile con un drawer de navegación flotante, actualizar el favicon, y publicar una nueva release v1.1.0 con tag y deploy a producción.

---

## Flujo de Trabajo con Git/GitHub

### Estructura de Ramas

- **main**: Rama principal de producción (protegida)
- **develop**: Rama de desarrollo e integración
- **feature/[issue-number]-[descripcion]**: Ramas para cada tarea individual

### Flujo por Fase (a partir de Fase 1)

**Inicio de Fase:**

1. Crear issue en GitHub para la FASE completa desde `develop`
2. El issue de la fase se cerrará cuando se haga merge `develop → main`

**Por cada Tarea dentro de la Fase:**

1. Crear issue en GitHub para la tarea específica
2. Asociar rama feature al issue: `feature/[issue-number]-[descripcion-corta]`
3. Desarrollar la tarea en esa rama
4. Hacer commit(s) con mensajes descriptivos (conventional commits)
5. Push de la rama al repositorio remoto
6. Crear Pull Request hacia `develop`
7. Realizar code review (autoreview o checklist)
8. Si aprueba: merge PR, eliminar rama, cerrar issue de tarea
9. Si requiere cambios: implementar cambios y repetir desde paso 4

**Fin de Fase:**

1. Una vez completadas TODAS las tareas de la fase
2. Crear Pull Request `develop → main` (asociado al issue de la FASE)
3. **DETENER DESARROLLO**
4. **NOTIFICAR** para revisión manual del PR
5. **ESPERAR APROBACIÓN** antes de continuar con siguiente fase
6. Al aprobar: merge PR, cerrar issue de fase
7. Continuar con siguiente fase

---

## FASE 1: Mejoras Visuales Rápidas

### Preparación de Fase 1

- Crear issue en GitHub: `"[Sprint v1.1.0] Fase 1: Mejoras Visuales — Favicon + Rotación + Inclinación Axial"`
- Este issue permanece abierto hasta el PR `develop → main` de fin de fase

---

### Tarea 1.1: Nuevo favicon SVG tipo Saturno

**Issue GitHub**: `"Reemplazar favicon con diseño tipo Saturno (planeta con anillos)"`
**Rama**: `feature/[issue-number]-favicon-saturno`

- Diseñar un SVG nuevo en `/public/favicon.svg` con:
  - Círculo central representando el planeta (color dorado/naranja)
  - Elipse inclinada atravesando el planeta (anillos de Saturno, beige/blanco semitransparente)
  - Optimizado para verse bien a 16×16px y 32×32px
- Verificar que `index.html` referencia `/favicon.svg` (no requiere cambios en HTML)

**Archivos a modificar**:
- `/public/favicon.svg`

**Commits sugeridos**:
- `feat(favicon): replace with Saturn-style planet SVG icon`

**PR**: feature → develop, code review, merge, cerrar issue de tarea

---

### Tarea 1.2: Corrección de rotación y agregar inclinación axial real

**Issue GitHub**: `"Corregir dirección de rotación de Venus/Urano y agregar axialTilt real a todos los planetas"`
**Rama**: `feature/[issue-number]-axial-tilt-rotation`

**Cambios en `src/types/planet.ts`**:
- Agregar campo `axialTilt: number` (grados) a la interfaz `Planet`

**Cambios en `src/data/planets.ts`**:
- Agregar `axialTilt` a cada planeta y corregir signo de `rotationSpeed`:

| Planeta   | axialTilt | rotationSpeed        |
|-----------|-----------|----------------------|
| Mercurio  | 0.03      | positivo (sin cambio)|
| Venus     | 177.4     | **negativo** (retrógrado) |
| Tierra    | 23.44     | positivo (sin cambio)|
| Marte     | 25.19     | positivo (sin cambio)|
| Júpiter   | 3.13      | positivo (sin cambio)|
| Saturno   | 26.73     | positivo (sin cambio)|
| Urano     | 97.77     | **negativo** (retrógrado) |
| Neptuno   | 28.32     | positivo (sin cambio)|

**Cambios en `src/components/Scene/Planet.tsx`**:
- Aplicar `axialTilt` como rotación en el eje Z del mesh del planeta
- Usar `THREE.MathUtils.degToRad(planet.axialTilt)` al montar el mesh
- La rotación en eje Y (`rotationSpeed`) continúa en `useFrame` como ya existe
- El efecto de Urano inclinado ~98° será visualmente dramático y correcto

**Archivos a modificar**:
- `src/types/planet.ts`
- `src/data/planets.ts`
- `src/components/Scene/Planet.tsx`

**Commits sugeridos**:
- `feat(planets): add axialTilt field to Planet type and data`
- `fix(planets): correct rotation direction for Venus and Uranus (retrograde)`
- `feat(scene): apply axialTilt to planet mesh rotation on Z axis`

**PR**: feature → develop, code review, merge, cerrar issue de tarea

---

### Fin de Fase 1

1. Verificar que el favicon nuevo se ve correctamente en la pestaña del navegador
2. Verificar visualmente que Urano está inclinado de lado (~98°) y Venus rota en sentido contrario
3. Crear Pull Request `develop → main` asociado al issue de Fase 1
4. **DETENER DESARROLLO**
5. **NOTIFICAR** para revisión manual y **ESPERAR APROBACIÓN**
6. Al aprobar: merge PR, cerrar issue de Fase 1

---

## FASE 2: Sistema de Satélites con Texturas

### Preparación de Fase 2

- Crear issue en GitHub: `"[Sprint v1.1.0] Fase 2: Sistema de Satélites con Texturas"`

---

### Tarea 2.1: Tipos y datos de satélites

**Issue GitHub**: `"Agregar tipo Satellite y datos de lunas famosas a cada planeta"`
**Rama**: `feature/[issue-number]-satellite-types-data`

**Cambios en `src/types/planet.ts`**:
- Agregar interfaz `Satellite`:

```typescript
export interface Satellite {
  name: string;
  orbitRadius: number;   // unidades relativas al tamaño del planeta
  orbitSpeed: number;    // radianes por frame
  size: number;          // tamaño relativo
  texturePath?: string;  // opcional, fallback a color sólido
  color?: string;        // color fallback (hex)
}
```

- Agregar `satellites?: Satellite[]` a la interfaz `Planet`

**Cambios en `src/data/planets.ts`**:
- Agregar array `satellites` a cada planeta con sus lunas:

| Planeta  | Satélites a mostrar                                        |
|----------|------------------------------------------------------------|
| Tierra   | Luna (con textura)                                         |
| Marte    | Fobos, Deimos (sin textura, grises)                        |
| Júpiter  | Io, Europa, Ganímedes, Calisto (todos con textura)         |
| Saturno  | Titán (con textura), Encélado (sin textura), Rea (sin textura) |
| Urano    | Titania, Oberón (sin textura)                              |
| Neptuno  | Tritón (con textura)                                       |
| Mercurio, Venus, Sol | Sin satélites                                |

**Archivos a modificar**:
- `src/types/planet.ts`
- `src/data/planets.ts`

**Commits sugeridos**:
- `feat(types): add Satellite interface and satellites field to Planet`
- `feat(data): add famous moons data for all planets`

**PR**: feature → develop, code review, merge, cerrar issue

---

### Tarea 2.2: Adquirir texturas de satélites famosos

**Issue GitHub**: `"Agregar texturas JPG para lunas con textura conocida"`
**Rama**: `feature/[issue-number]-satellite-textures`

- Crear carpeta `/public/textures/satellites/`
- Obtener texturas (misma fuente que planetas — Solar System Scope / NASA, libre uso):

| Archivo          | Satélite       |
|------------------|----------------|
| `moon.jpg`       | Luna (Tierra)  |
| `io.jpg`         | Io (Júpiter)   |
| `europa.jpg`     | Europa (Júpiter) |
| `ganymede.jpg`   | Ganímedes (Júpiter) |
| `callisto.jpg`   | Calisto (Júpiter) |
| `titan.jpg`      | Titán (Saturno) |
| `triton.jpg`     | Tritón (Neptuno) |

- Actualizar `texturePath` en `src/data/planets.ts` para cada satélite correspondiente
- Actualizar `/public/textures/README.md` con las nuevas texturas y sus fuentes

**Archivos a crear/modificar**:
- `/public/textures/satellites/*.jpg` (7 archivos)
- `src/data/planets.ts` (actualizar `texturePath`)
- `/public/textures/README.md`

**Commits sugeridos**:
- `feat(assets): add texture files for 7 major moons in satellites/ folder`
- `feat(data): wire texturePath for moons with known textures`

**PR**: feature → develop, code review, merge, cerrar issue

---

### Tarea 2.3: Componente Satellite.tsx

**Issue GitHub**: `"Crear componente Satellite para renderizar lunas orbitando planetas"`
**Rama**: `feature/[issue-number]-satellite-component`

- Crear `src/components/Scene/Satellite.tsx`:
  - Props: `satellite: Satellite`, `planetPosition: THREE.Vector3`
  - Usa `useRef` para el mesh y `useFrame` para animar la posición orbital
  - Calcula posición X/Z en función del ángulo actual y `orbitRadius` relativo a `planetPosition`
  - Si `texturePath` existe: usa `useTexture` para cargar la textura (mismo patrón que `Planet.tsx`)
  - Si no: usa `meshStandardMaterial` con `color` de fallback (gris claro)
  - Geometría: `sphereGeometry` con segmentos `[size, 16, 16]` en desktop
  - Incluir `Suspense` boundary para la carga de textura

**Archivos a crear**:
- `src/components/Scene/Satellite.tsx`

**Commits sugeridos**:
- `feat(scene): add Satellite component with orbital animation and texture support`

**PR**: feature → develop, code review, merge, cerrar issue

---

### Tarea 2.4: Integrar Satellite en Planet.tsx

**Issue GitHub**: `"Renderizar satélites de cada planeta desde Planet.tsx"`
**Rama**: `feature/[issue-number]-satellite-integration`

- En `src/components/Scene/Planet.tsx`:
  - Usar `useRef` en el grupo del planeta para obtener posición world en cada frame
  - Mapear `planet.satellites` y renderizar `<Satellite>` por cada luna
  - Pasar `planetPosition` actualizada vía `useFrame`
- Verificar que la escena completa funciona sin regresiones

**Archivos a modificar**:
- `src/components/Scene/Planet.tsx`

**Commits sugeridos**:
- `feat(scene): integrate Satellite rendering inside Planet component`

**PR**: feature → develop, code review, merge, cerrar issue

---

### Fin de Fase 2

1. Verificar visualmente que cada planeta muestra sus lunas orbitando
2. Verificar que Luna, Io, Europa, Ganímedes, Calisto, Titán y Tritón tienen textura
3. Verificar que no hay regresiones en desktop (selección de planetas, cámara, etc.)
4. Crear Pull Request `develop → main` asociado al issue de Fase 2
5. **DETENER DESARROLLO**
6. **NOTIFICAR** para revisión manual y **ESPERAR APROBACIÓN**
7. Al aprobar: merge PR, cerrar issue de Fase 2

---

## FASE 3: Mobile Controls + Performance Moderada

### Preparación de Fase 3

- Crear issue en GitHub: `"[Sprint v1.1.0] Fase 3: Mobile Controls + Optimización de Performance"`

---

### Tarea 3.1: FloatingMenuButton — Botón flotante para mobile

**Issue GitHub**: `"Crear botón flotante (FAB) para abrir el drawer de planetas en mobile"`
**Rama**: `feature/[issue-number]-floating-menu-button`

- Crear `src/components/UI/FloatingMenuButton.tsx`:
  - Botón circular fijo en la esquina inferior derecha
  - Ícono usando los iconos SVG existentes (`/public/icons.svg`)
  - Props: `onClick: () => void`, `isOpen: boolean`
  - Estado visual: ícono cambia cuando el drawer está abierto (muestra X para cerrar)
- Crear `src/components/UI/FloatingMenuButton.css`:
  - Visible SOLO en mobile con `@media (max-width: 768px)`
  - Oculto en desktop con `display: none`
  - z-index alto (sobre la escena 3D)
  - Animación de tap con `transform: scale()`

**Archivos a crear**:
- `src/components/UI/FloatingMenuButton.tsx`
- `src/components/UI/FloatingMenuButton.css`

**Commits sugeridos**:
- `feat(ui): add FloatingMenuButton component for mobile planet navigation`

**PR**: feature → develop, code review, merge, cerrar issue

---

### Tarea 3.2: PlanetDrawer — Drawer de planetas para mobile

**Issue GitHub**: `"Crear drawer deslizable con lista de planetas para mobile"`
**Rama**: `feature/[issue-number]-planet-drawer`

- Crear `src/components/UI/PlanetDrawer.tsx`:
  - Panel que se desliza desde abajo (slide-up animation CSS)
  - Lista todos los planetas con nombre y círculo de color representativo
  - Al seleccionar un planeta: llama al mismo handler que `PlanetNavigation` (reutiliza `usePlanetSelection`)
  - Se cierra al seleccionar o al tocar el overlay de fondo
  - Props: `isOpen: boolean`, `onClose: () => void`, `onSelectPlanet: (planet) => void`, `planets: Planet[]`
- Crear `src/components/UI/PlanetDrawer.css`:
  - Animación `slide-up` con `transform: translateY()`
  - Overlay semitransparente de fondo
  - Visible SOLO en mobile (`@media (max-width: 768px)`)
  - Altura máxima 60% de la pantalla, scrollable
- Integrar en `src/App.tsx`:
  - Agregar estado `drawerOpen: boolean`
  - Renderizar `<FloatingMenuButton>` y `<PlanetDrawer>`
  - Conectar con `usePlanetSelection`

**Archivos a crear/modificar**:
- `src/components/UI/PlanetDrawer.tsx`
- `src/components/UI/PlanetDrawer.css`
- `src/App.tsx`

**Commits sugeridos**:
- `feat(ui): add PlanetDrawer slide-up component for mobile planet selection`
- `feat(app): integrate FloatingMenuButton and PlanetDrawer in App`

**PR**: feature → develop, code review, merge, cerrar issue

---

### Tarea 3.3: Optimizaciones de performance en mobile

**Issue GitHub**: `"Optimizar performance de escena 3D en dispositivos mobile"`
**Rama**: `feature/[issue-number]-mobile-performance`

- Crear `src/hooks/useIsMobile.ts`:
  - Detecta viewport mobile (`window.innerWidth < 768`)
  - Usa `useEffect` + listener de `resize`
- Modificar `src/components/Scene/SolarSystemCanvas.tsx`:
  - Pasar `dpr={[1, 2]}` al `<Canvas>` (limita devicePixelRatio a máximo 2)
- Modificar `src/components/Scene/Planet.tsx`:
  - Segmentos de esfera: `isMobile ? 32 : 64`
  - Satélites: en mobile, renderizar SOLO los que tienen `texturePath` definido
- Modificar `src/components/Scene/Satellite.tsx`:
  - Segmentos de esfera: `isMobile ? 8 : 16`

**Archivos a crear/modificar**:
- `src/hooks/useIsMobile.ts` (nuevo)
- `src/components/Scene/SolarSystemCanvas.tsx`
- `src/components/Scene/Planet.tsx`
- `src/components/Scene/Satellite.tsx`

**Commits sugeridos**:
- `feat(hooks): add useIsMobile hook for responsive 3D optimizations`
- `perf(scene): reduce sphere segments and satellite count on mobile`
- `perf(canvas): set dpr cap to 2 and apply mobile-aware rendering`

**PR**: feature → develop, code review, merge, cerrar issue

---

### Fin de Fase 3

1. Probar en dispositivo mobile real o DevTools mobile simulator:
   - El botón flotante es visible y funcional
   - El drawer abre/cierra correctamente con animación
   - Seleccionar un planeta desde el drawer mueve la cámara
   - `PlanetNavigation` de desktop sigue funcionando en desktop
2. Verificar FPS aceptable en mobile con satélites activos
3. Crear Pull Request `develop → main` asociado al issue de Fase 3
4. **DETENER DESARROLLO**
5. **NOTIFICAR** para revisión manual y **ESPERAR APROBACIÓN**
6. Al aprobar: merge PR, cerrar issue de Fase 3

---

## FASE 4: Deploy, Release v1.1.0 y Tag

### Preparación de Fase 4

- Crear issue en GitHub: `"[Sprint v1.1.0] Fase 4: Release v1.1.0 — Deploy, Tag y GitHub Release"`

---

### Tarea 4.1: Bump de versión y CHANGELOG

**Issue GitHub**: `"Actualizar versión a 1.1.0 y documentar cambios en CHANGELOG"`
**Rama**: `feature/[issue-number]-version-bump-changelog`

- `package.json`: cambiar `"version": "1.0.1"` → `"version": "1.1.0"`
- `CHANGELOG.md`: agregar entrada para v1.1.0:

```markdown
## [1.1.0] - YYYY-MM-DD

### Added
- Favicon rediseñado: planeta estilo Saturno con anillos
- Inclinación axial real para todos los planetas (Tierra 23.4°, Urano 97.8°, etc.)
- Sistema de satélites visuales: lunas famosas orbitando sus planetas con texturas
- Drawer de navegación flotante para mobile (FAB + slide-up panel)

### Fixed
- Dirección de rotación corregida para Venus (retrógrado) y Urano (retrógrado)

### Performance
- Reducción de segmentos de geometrías en mobile (64→32 planetas, 16→8 satélites)
- Límite de devicePixelRatio a máximo 2 en Canvas
- Satélites simplificados en mobile (solo los de textura conocida)
```

**Archivos a modificar**:
- `package.json`
- `CHANGELOG.md`

**Commits sugeridos**:
- `chore: bump version to 1.1.0`
- `docs: update CHANGELOG for v1.1.0 sprint`

**PR**: feature → develop, code review, merge, cerrar issue

---

### Tarea 4.2: PR develop → main, Tag v1.1.0 y GitHub Release

**Issue**: es el issue de la Fase 4 misma
**No se crea rama separada** — opera directamente sobre `develop` y `main`

1. Crear PR `develop → main`:
   - Título: `"Release v1.1.0 — Satellites, Axial Tilt, Mobile Drawer, Favicon"`
   - Body: resumen de todos los cambios del sprint
2. **DETENER DESARROLLO**
3. **NOTIFICAR** para revisión manual y **ESPERAR APROBACIÓN**
4. Al aprobar: merge PR
5. Crear y publicar tag en `main`:

```bash
git tag -a v1.1.0 -m "Release v1.1.0 — Sprint de mejoras: satélites, inclinación axial, mobile drawer, favicon"
git push origin v1.1.0
```

6. Crear GitHub Release:

```bash
gh release create v1.1.0 \
  --title "v1.1.0 — Mejoras astronómicas y mobile" \
  --notes "Ver CHANGELOG.md para lista completa de cambios"
```

7. Cerrar issue de Fase 4

---

### Tarea 4.3: Verificar deploy en Vercel producción

- El merge a `main` dispara automáticamente el deploy en Vercel (CI configurado)
- Verificar en el dashboard de Vercel que el deploy completó exitosamente
- Abrir la URL de producción y verificar:
  - Favicon nuevo visible en la pestaña del navegador
  - Planetas con inclinación axial (especialmente Urano inclinado)
  - Satélites visibles orbitando planetas con texturas
  - En mobile: botón flotante y drawer funcional
- Si el deploy automático falla: ejecutar `vercel --prod` manualmente

---

### Fin de Fase 4 — Fin del Sprint

1. Confirmar que la release v1.1.0 aparece en GitHub Releases
2. Confirmar que el tag v1.1.0 está publicado en el repositorio
3. Confirmar que la URL de producción refleja todos los cambios del sprint
4. Cerrar issue de Fase 4
5. Sprint v1.1.0 completado ✓

---

## Checklist de Verificación End-to-End

### Desktop
- [ ] Favicon de Saturno visible en la pestaña del navegador
- [ ] Todos los planetas tienen inclinación axial visible (Urano dramáticamente inclinado)
- [ ] Venus rota en sentido contrario al resto de los planetas
- [ ] La Luna orbita la Tierra con textura
- [ ] Lunas de Júpiter (Io, Europa, Ganímedes, Calisto) visibles con textura
- [ ] Titán orbita Saturno con textura
- [ ] Tritón orbita Neptuno con textura
- [ ] Lunas sin textura (Fobos, Deimos, Encélado, etc.) visibles en color sólido
- [ ] `PlanetNavigation` sigue funcionando en desktop
- [ ] Selección de planetas y animación de cámara sin regresiones

### Mobile (DevTools o dispositivo real)
- [ ] Botón flotante (FAB) visible en esquina inferior derecha
- [ ] Drawer abre al tocar el botón con animación slide-up
- [ ] Lista de planetas en el drawer, selección mueve la cámara
- [ ] Drawer se cierra al seleccionar o tocar fuera
- [ ] FPS aceptable con satélites activos en mobile
- [ ] `PlanetNavigation` de desktop no interfiere en mobile

### Release
- [ ] `package.json` version = "1.1.0"
- [ ] `CHANGELOG.md` actualizado con entrada v1.1.0
- [ ] Tag `v1.1.0` publicado en git
- [ ] GitHub Release creada con notas del sprint
- [ ] Deploy en producción exitoso y verificado
