# Plan de Trabajo: Sistema Solar 3D con Three.js

## Información del Proyecto

- **Tipo**: Aplicación web interactiva 3D
- **Stack**: React + Vite + TypeScript + Three.js
- **Gestor de paquetes**: pnpm
- **Control de versiones**: Git + GitHub
- **Deploy**: Vercel (CLI configurado)
- **Objetivo**: Portafolio profesional

## Flujo de Trabajo con Git/GitHub

### Estructura de Ramas

- **main**: Rama principal de producción (protegida)
- **develop**: Rama de desarrollo e integración
- **feature/[issue-number]-[descripcion]**: Ramas para cada tarea individual

### Flujo por Fase (a partir de Fase 2)

**Inicio de Fase:**

1. Crear issue en GitHub para la FASE completa desde `main`
2. El issue de la fase se cerrará cuando se haga merge `develop -> main`

**Por cada Tarea dentro de la Fase:**

1. Crear issue en GitHub para la tarea específica
2. Asociar rama feature al issue: `feature/[issue-number]-[descripcion-corta]`
3. Desarrollar la tarea en esa rama
4. Hacer commit(s) con mensajes descriptivos
5. Push de la rama al repositorio remoto
6. Crear Pull Request hacia `develop`
7. Realizar code review (autoreview o checklist)
8. Si aprueba: merge PR, eliminar rama, cerrar issue de tarea
9. Si requiere cambios: implementar cambios y repetir desde paso 4

**Fin de Fase:**

1. Una vez completadas TODAS las tareas de la fase
2. Crear Pull Request `develop -> main` (asociado al issue de la FASE)
3. **DETENER DESARROLLO**
4. **NOTIFICAR** para revisión manual del PR
5. **ESPERAR APROBACIÓN** antes de continuar con siguiente fase
6. Al aprobar: merge PR, cerrar issue de fase
7. Continuar con siguiente fase

---

## FASE 0: CONFIGURACIÓN INICIAL DEL PROYECTO

### Tarea 0.1: Crear el directorio del proyecto

- Navegar a la ubicación deseada en el sistema de archivos
- Crear un directorio con el nombre del proyecto (ejemplo: `solar-system-3d`)
- Entrar al directorio creado

### Tarea 0.2: Inicializar proyecto con Vite

- Ejecutar el comando de creación de proyecto Vite con template React + TypeScript
- Seleccionar la opción de React
- Seleccionar la variante TypeScript
- Confirmar que se crearon los archivos base del proyecto

### Tarea 0.3: Limpiar archivos de ejemplo

- Eliminar archivos innecesarios del template:
  - `src/App.css`
  - `src/index.css` (o limpiarlo completamente)
  - Contenido de ejemplo en `src/App.tsx`
- Dejar solo la estructura mínima funcional

### Tarea 0.4: Instalar dependencias base

- Ejecutar instalación de dependencias con pnpm
- Verificar que `node_modules` se creó correctamente
- Verificar que `pnpm-lock.yaml` fue generado

### Tarea 0.5: Instalar Three.js y dependencias relacionadas

- Instalar `three` como dependencia de producción
- Instalar `@types/three` como dependencia de desarrollo
- Instalar `@react-three/fiber` para integración con React
- Instalar `@react-three/drei` para helpers de Three.js

### Tarea 0.6: Verificar funcionamiento básico

- Ejecutar el servidor de desarrollo
- Abrir el navegador en localhost
- Confirmar que la aplicación base funciona sin errores
- Detener el servidor de desarrollo

---

## FASE 1: CONFIGURACIÓN DE GIT Y GITHUB

### Tarea 1.1: Inicializar repositorio Git local

- Ejecutar `git init` en el directorio del proyecto
- Verificar que se creó la carpeta `.git`

### Tarea 1.2: Configurar .gitignore

- Verificar que existe el archivo `.gitignore`
- Asegurar que incluye:
  - `node_modules/`
  - `dist/`
  - `.env`
  - `.env.local`
  - Archivos del sistema operativo (`.DS_Store`, etc.)

### Tarea 1.3: Crear primer commit en main

- Agregar todos los archivos al staging area
- Crear commit inicial con mensaje descriptivo (ejemplo: "Initial project setup with Vite + React + TypeScript")

### Tarea 1.4: Crear repositorio en GitHub

- Usar GitHub CLI para crear el repositorio remoto
- Configurar como repositorio público
- NO inicializar con README (ya existe localmente)
- Usar un nombre descriptivo (ejemplo: `solar-system-3d`)

### Tarea 1.5: Conectar repositorio local con remoto

- Agregar el remote origin con la URL del repositorio GitHub
- Verificar que el remote fue agregado correctamente

### Tarea 1.6: Push inicial a main

- Hacer push de la rama main al repositorio remoto
- Configurar upstream: `git push -u origin main`
- Verificar en GitHub que los archivos fueron subidos correctamente

### Tarea 1.7: Crear rama develop

- Crear rama develop desde main: `git checkout -b develop`
- Push de develop al remoto: `git push -u origin develop`
- Verificar que ambas ramas existen en GitHub

### Tarea 1.8: Configurar rama develop como default en GitHub

- Ir a Settings del repositorio en GitHub
- En "Branches" cambiar default branch a `develop`
- Guardar cambios
- Verificar que develop es ahora la rama por defecto

### Tarea 1.9: Crear README.md básico

- Asegurarse de estar en rama develop
- Crear archivo `README.md` en la raíz del proyecto
- Agregar título del proyecto
- Agregar descripción breve del proyecto
- Agregar sección de tecnologías utilizadas
- Agregar instrucciones básicas de instalación
- Hacer commit en develop
- Push a origin develop

### Tarea 1.10: Crear primer PR develop->main (práctica)

- Crear Pull Request de develop a main con el README
- Revisar el PR
- Aprobar y hacer merge
- Verificar que main está actualizado
- Volver a rama develop: `git checkout develop`

---

## FASE 2: ESTRUCTURA BASE DEL PROYECTO

**⚠️ INICIO DE FASE CON NUEVO FLUJO DE TRABAJO**

### Pre-requisito de la Fase

- Estar en rama `develop`
- Crear issue de GitHub para "FASE 2: Estructura base del proyecto"
- Este issue permanecerá abierto hasta el merge final `develop -> main`

---

### Tarea 2.1: Crear estructura de carpetas

**Flujo Git:**

1. Crear issue: "Crear estructura de carpetas del proyecto"
2. Crear rama desde develop: `git checkout -b feature/[issue-number]-folder-structure`
3. Desarrollar la tarea
4. Commit y push
5. Crear PR hacia `develop`
6. Code review (verificar que estructura es correcta)
7. Aprobar y merge PR
8. Eliminar rama feature
9. Cerrar issue

**Desarrollo:**

- Crear carpeta `src/components/`
- Crear carpeta `src/components/Scene/`
- Crear carpeta `src/components/UI/`
- Crear carpeta `src/data/`
- Crear carpeta `src/types/`
- Crear carpeta `src/utils/`
- Crear carpeta `src/hooks/`

---

### Tarea 2.2: Crear archivo de tipos para planetas

**Flujo Git:**

1. Asegurarse de estar en develop actualizado: `git checkout develop && git pull`
2. Crear issue: "Crear tipos TypeScript para planetas"
3. Crear rama: `git checkout -b feature/[issue-number]-planet-types`
4. Desarrollar la tarea
5. Commit y push
6. Crear PR hacia `develop`
7. Code review (verificar tipos están bien definidos)
8. Aprobar y merge PR
9. Eliminar rama feature
10. Cerrar issue

**Desarrollo:**

- Crear archivo `src/types/planet.ts`
- Definir interface para las propiedades de un planeta:
  - nombre
  - diámetro
  - distancia del sol
  - temperatura
  - número de satélites
  - tipo de planeta
  - dato curioso
  - color base (para renderizado inicial)
  - tamaño relativo (para visualización)
  - velocidad de rotación
  - velocidad de órbita

---

### Tarea 2.3: Crear datos de planetas

**Flujo Git:**

1. Volver a develop y actualizar: `git checkout develop && git pull`
2. Crear issue: "Agregar datos de los planetas del sistema solar"
3. Crear rama: `git checkout -b feature/[issue-number]-planet-data`
4. Desarrollar la tarea
5. Commit y push
6. Crear PR hacia `develop`
7. Code review (verificar datos son precisos y completos)
8. Aprobar y merge PR
9. Eliminar rama feature
10. Cerrar issue

**Desarrollo:**

- Crear archivo `src/data/planets.ts`
- Exportar array con datos de los 8 planetas del sistema solar
- Incluir el Sol como objeto central
- Usar datos astronómicos básicos pero ajustados para visualización
- Asignar valores de escala apropiados para el renderizado 3D

---

### Tarea 2.4: Verificación final de la fase

**Flujo Git:**

1. Volver a develop: `git checkout develop && git pull`
2. Verificar que todas las tareas anteriores están mergeadas
3. Verificar que todos los issues de tareas están cerrados
4. Compilar proyecto para verificar que no hay errores de TypeScript
5. Ejecutar servidor de desarrollo para verificar que todo funciona

---

### Fin de Fase 2

**⚠️ CHECKPOINT - REQUIERE APROBACIÓN MANUAL**

1. Crear Pull Request: `develop -> main`
2. Título del PR: "FASE 2: Estructura base del proyecto"
3. Asociar al issue de la FASE 2
4. En la descripción del PR listar todas las tareas completadas
5. **DETENER DESARROLLO**
6. **NOTIFICAR** que Fase 2 está lista para revisión
7. **ESPERAR APROBACIÓN MANUAL** del PR
8. Una vez aprobado:
   - Hacer merge del PR
   - Cerrar issue de FASE 2
   - Actualizar rama develop: `git checkout develop && git pull`
9. Continuar con FASE 3

---

## FASE 3: IMPLEMENTACIÓN DE LA ESCENA 3D BASE

**⚠️ INICIO DE FASE**

- Estar en rama `develop` actualizada
- Crear issue de GitHub: "FASE 3: Implementación de la escena 3D base"

---

### Patrón de Flujo para TODAS las Tareas de esta Fase:

**Para cada tarea (3.1 a 3.9):**

1. `git checkout develop && git pull`
2. Crear issue en GitHub para la tarea específica
3. Crear rama: `git checkout -b feature/[issue-number]-[descripcion-corta]`
4. Desarrollar la tarea según las instrucciones
5. `git add .` y `git commit -m "mensaje descriptivo"`
6. `git push -u origin feature/[issue-number]-[descripcion-corta]`
7. Crear PR desde feature branch hacia `develop`
8. Realizar code review (checklist de verificación)
9. Si aprueba: merge PR, `git branch -d feature/[issue-number]` (local), eliminar en remoto, cerrar issue
10. Si requiere cambios: realizar cambios, commit, push, repetir review

---

### Tarea 3.1: Crear componente Canvas principal

**Issue**: "Crear componente SolarSystemCanvas con configuración base"

**Desarrollo:**

- Crear archivo `src/components/Scene/SolarSystemCanvas.tsx`
- Importar Canvas de `@react-three/fiber`
- Configurar el componente Canvas con:
  - Camera position inicial
  - Color de fondo (negro espacial)
  - Configuración básica de renderizado

**Code Review Checklist:**

- [ ] Archivo creado en ubicación correcta
- [ ] Imports correctos
- [ ] Canvas configurado con props básicas
- [ ] Código compila sin errores TypeScript

---

### Tarea 3.2: Crear componente de iluminación

**Issue**: "Crear componente Lights para iluminación de la escena"

**Desarrollo:**

- Crear archivo `src/components/Scene/Lights.tsx`
- Agregar luz ambiental suave
- Agregar luz puntual en posición del Sol
- Exportar componente de luces

**Code Review Checklist:**

- [ ] Ambos tipos de luz implementados
- [ ] Posiciones e intensidades apropiadas
- [ ] Componente exportado correctamente

---

### Tarea 3.3: Crear componente Sun (Sol)

**Issue**: "Crear componente Sun para renderizar el Sol"

**Desarrollo:**

- Crear archivo `src/components/Scene/Sun.tsx`
- Renderizar una esfera con geometría básica
- Aplicar material emisivo (que genere luz propia)
- Usar color amarillo/naranja
- Posicionar en el centro (0, 0, 0)
- Agregar escala apropiada

**Code Review Checklist:**

- [ ] Esfera renderizada correctamente
- [ ] Material emisivo aplicado
- [ ] Posición centrada
- [ ] Color apropiado

---

### Tarea 3.4: Crear componente Planet genérico

**Issue**: "Crear componente Planet genérico reutilizable"

**Desarrollo:**

- Crear archivo `src/components/Scene/Planet.tsx`
- Recibir props con datos del planeta (usar tipos definidos)
- Renderizar esfera con tamaño basado en props
- Aplicar color temporal basado en props
- Posicionar según distancia del sol
- Agregar rotación básica sobre su propio eje

**Code Review Checklist:**

- [ ] Props tipadas correctamente
- [ ] Renderizado dinámico basado en props
- [ ] Posicionamiento correcto
- [ ] Rotación implementada

---

### Tarea 3.5: Crear componente OrbitControls

**Issue**: "Integrar OrbitControls para navegación de cámara"

**Desarrollo:**

- Importar OrbitControls de `@react-three/drei`
- Configurar en el Canvas principal
- Permitir rotación con mouse drag
- Permitir zoom con scroll
- Limitar ángulos de rotación si es necesario

**Code Review Checklist:**

- [ ] OrbitControls importado y configurado
- [ ] Controles funcionan correctamente
- [ ] Límites apropiados establecidos

---

### Tarea 3.6: Integrar todo en App.tsx

**Issue**: "Integrar escena 3D en componente App principal"

**Desarrollo:**

- Limpiar contenido anterior de App.tsx
- Importar SolarSystemCanvas
- Renderizar el canvas ocupando toda la ventana
- Agregar estilos básicos para ocupar viewport completo

**Code Review Checklist:**

- [ ] App.tsx limpio y organizado
- [ ] Canvas renderizado correctamente
- [ ] Estilos para full viewport aplicados
- [ ] No hay contenido de ejemplo residual

---

### Tarea 3.7: Renderizar todos los planetas

**Issue**: "Renderizar todos los planetas usando componente Planet"

**Desarrollo:**

- Crear lista de componentes Planet en SolarSystemCanvas
- Mapear el array de datos de planetas
- Renderizar cada planeta con sus propiedades
- Verificar que todos aparecen en la escena

**Code Review Checklist:**

- [ ] Todos los planetas renderizados
- [ ] Datos mapeados correctamente
- [ ] Posiciones apropiadas

---

### Tarea 3.8: Agregar componente Lights a la escena

**Issue**: "Integrar componente de luces en la escena"

**Desarrollo:**

- Importar componente Lights en SolarSystemCanvas
- Agregar dentro del Canvas
- Verificar iluminación de planetas

**Code Review Checklist:**

- [ ] Lights agregado a la escena
- [ ] Iluminación visible en planetas
- [ ] No hay warnings de renderizado

---

### Tarea 3.9: Verificación y testing de escena base

**Issue**: "Verificar funcionamiento completo de escena 3D base"

**Desarrollo:**

- Ejecutar servidor de desarrollo
- Verificar que el Sol se renderiza correctamente
- Verificar que todos los planetas aparecen
- Verificar que los controles orbitales funcionan
- Verificar que no hay errores en consola
- Verificar performance básico (FPS)
- Documentar cualquier issue encontrado

**Code Review Checklist:**

- [ ] Aplicación corre sin errores
- [ ] Todos los elementos visibles
- [ ] Controles funcionan
- [ ] Performance aceptable
- [ ] Consola limpia

---

### Fin de Fase 3

**⚠️ CHECKPOINT - REQUIERE APROBACIÓN MANUAL**

1. Verificar que TODAS las tareas (3.1 a 3.9) están completadas y mergeadas a develop
2. Verificar que TODOS los issues de tareas están cerrados
3. `git checkout develop && git pull`
4. Ejecutar build: `pnpm build`
5. Verificar build exitoso
6. Crear Pull Request: `develop -> main`
   - Título: "FASE 3: Implementación de la escena 3D base"
   - Descripción: Listar todas las tareas completadas (3.1 a 3.9)
   - Asociar al issue de FASE 3
7. **DETENER DESARROLLO**
8. **NOTIFICAR**: "Fase 3 completada y lista para revisión - PR develop->main creado"
9. **ESPERAR APROBACIÓN MANUAL**
10. Después de aprobación:
    - Hacer merge del PR
    - Cerrar issue de FASE 3
    - `git checkout develop && git pull`
    - Continuar con FASE 4

---

## TEMPLATE DE FLUJO PARA FASES 4-12

**Este flujo se aplica a TODAS las fases restantes (4, 5, 6, 7, 8, 9, 10, 11, 12)**

### Inicio de Cada Fase:

1. Estar en rama `develop` actualizada: `git checkout develop && git pull`
2. Crear issue de GitHub: "FASE [N]: [Nombre de la fase]"
3. Este issue permanece abierto hasta merge final `develop -> main`

### Por Cada Tarea de la Fase:

1. `git checkout develop && git pull`
2. Crear issue: "[Descripción específica de la tarea]"
3. Crear rama: `git checkout -b feature/[issue-number]-[descripcion-kebab-case]`
4. Desarrollar la tarea según instrucciones
5. Hacer commit(s): `git add . && git commit -m "mensaje descriptivo relacionado al issue"`
6. Push: `git push -u origin feature/[issue-number]-[descripcion]`
7. Crear PR: feature branch → `develop`
   - Título: mismo que el issue
   - Descripción: explicar cambios realizados
   - Asociar al issue
8. Code Review:
   - Revisar cambios en GitHub
   - Verificar checklist de la tarea
   - Probar localmente si es necesario (hacer checkout de la rama)
9. Si aprueba:
   - Aprobar y merge PR (squash o merge commit según preferencia)
   - Eliminar rama feature local: `git branch -d feature/[issue-number]`
   - Eliminar rama remota (GitHub lo hace automático al merge si está configurado)
   - Cerrar issue de la tarea
10. Si requiere cambios:
    - Comentar en el PR qué cambios son necesarios
    - Realizar cambios en la misma rama
    - Commit y push adicionales
    - Repetir review

### Fin de Cada Fase:

1. Verificar que TODAS las tareas están completadas y mergeadas a `develop`
2. Verificar que TODOS los issues de tareas están cerrados
3. `git checkout develop && git pull`
4. Ejecutar build y verificar: `pnpm build && pnpm preview`
5. Crear Pull Request: `develop -> main`
   - Título: "FASE [N]: [Nombre de la fase]"
   - Descripción: Resumen de la fase + lista de tareas completadas
   - Asociar al issue de la FASE
6. **⚠️ DETENER DESARROLLO**
7. **📢 NOTIFICAR**: "FASE [N] completada - PR develop→main #[número] listo para revisión"
8. **⏸️ ESPERAR APROBACIÓN MANUAL** del usuario
9. Después de aprobación:
   - Hacer merge del PR develop → main
   - Cerrar issue de FASE
   - `git checkout develop && git pull` (sincronizar cambios)
   - Continuar con siguiente fase

---

## FASE 4: SISTEMA DE SELECCIÓN DE PLANETAS

**⚠️ INICIO DE FASE**: Crear issue "FASE 4: Sistema de selección de planetas"

**📋 APLICAR FLUJO DE TEMPLATE PARA CADA TAREA**

---

### Tarea 4.1: Crear estado global para planeta seleccionado

**Issue**: "Crear estado global para manejo de planeta seleccionado"

- Crear custom hook `src/hooks/usePlanetSelection.ts` o usar useState en App
- Definir estado para almacenar el planeta actualmente seleccionado
- Definir función para actualizar el planeta seleccionado
- Exportar estado y función

---

### Tarea 4.2: Agregar evento onClick a planetas

**Issue**: "Implementar evento click en componente Planet"

- Modificar componente Planet
- Agregar evento onClick a la mesh del planeta
- Llamar función de selección cuando se haga click
- Pasar el planeta actual como argumento

---

### Tarea 4.3: Agregar feedback visual a planeta seleccionado

**Issue**: "Agregar feedback visual cuando planeta está seleccionado"

- Modificar componente Planet para recibir prop `isSelected`
- Cuando isSelected es true:
  - Aumentar levemente la escala del planeta
  - Agregar un anillo orbital o outline
  - Cambiar opacidad o brillo

---

### Tarea 4.4: Implementar deselección

**Issue**: "Permitir deseleccionar planeta clickeando espacio vacío"

- Permitir click en espacio vacío para deseleccionar
- Agregar evento onClick al Canvas o fondo
- Limpiar selección cuando se hace click fuera de planetas

---

### Tarea 4.5: Crear componente PlanetInfo panel

**Issue**: "Crear componente PlanetInfo para mostrar información"

- Crear archivo `src/components/UI/PlanetInfo.tsx`
- Crear panel lateral con estilos CSS
- Mostrar solo cuando hay un planeta seleccionado
- Posicionar fijo en lateral derecho de la pantalla
- Agregar animación de entrada/salida

---

### Tarea 4.6: Mostrar datos del planeta en el panel

**Issue**: "Renderizar datos del planeta en panel de información"

- Recibir datos del planeta seleccionado como props
- Renderizar todos los campos del planeta:
  - Nombre, diámetro, distancia del Sol
  - Temperatura, número de satélites
  - Tipo de planeta, dato curioso
- Usar formato legible y organizado

---

### Tarea 4.7: Agregar botón de cierre al panel

**Issue**: "Agregar botón de cierre en panel de información"

- Agregar botón "X" o "Close" en el panel
- Al hacer click, limpiar la selección
- Cerrar el panel con animación

---

### Tarea 4.8: Estilos del panel de información

**Issue**: "Diseñar estilos CSS del panel de información"

- Crear estilos CSS para el panel
- Usar fondo semi-transparente oscuro
- Agregar padding y spacing apropiados
- Hacer responsive para móviles
- Agregar transiciones suaves

---

### Tarea 4.9: Prueba del sistema de selección

**Issue**: "Verificar funcionamiento completo del sistema de selección"

- Ejecutar la aplicación
- Hacer click en diferentes planetas
- Verificar que el panel muestra información correcta
- Verificar feedback visual en planeta seleccionado
- Verificar que el botón de cierre funciona
- Verificar comportamiento en diferentes tamaños de pantalla
- Documentar cualquier bug encontrado

---

### Tarea 4.10: Ajustes finales y refactoring

**Issue**: "Refactorizar y optimizar código de selección de planetas"

- Revisar código en busca de mejoras
- Optimizar re-renders si es necesario
- Agregar PropTypes o validaciones TypeScript
- Limpiar console.logs de debugging

---

**⚠️ FIN DE FASE 4 - CHECKPOINT**

- Crear PR develop → main: "FASE 4: Sistema de selección de planetas"
- DETENER, NOTIFICAR y ESPERAR APROBACIÓN

---

## FASE 5: MEJORAS VISUALES - TEXTURAS

**⚠️ INICIO DE FASE**: Crear issue "FASE 5: Mejoras visuales - Texturas"

**📋 APLICAR FLUJO DE TEMPLATE PARA CADA TAREA**

---

### Tarea 5.1: Crear carpeta para assets

**Issue**: "Crear estructura de carpetas para texturas"

- Crear carpeta `public/textures/`

---

### Tarea 5.2: Descargar texturas de planetas

**Issue**: "Descargar y agregar texturas de planetas"

- Buscar texturas gratuitas (Solar System Scope, NASA, etc.)
- Descargar textura para cada planeta + Sol
- Formato: JPG o PNG
- Resolución: 1024x512 o 2048x1024
- Guardar en `public/textures/`

---

### Tarea 5.3: Agregar rutas de texturas a datos

**Issue**: "Actualizar datos de planetas con rutas de texturas"

- Modificar `src/data/planets.ts`
- Agregar propiedad `texture` a cada planeta
- Asignar ruta (ejemplo: `/textures/earth.jpg`)

---

### Tarea 5.4: Crear utilidad para cargar texturas

**Issue**: "Crear helper para carga de texturas"

- Crear archivo `src/utils/textureLoader.ts`
- Implementar función helper para cargar texturas
- Manejar errores de carga
- Retornar texture o fallback

---

### Tarea 5.5: Modificar Planet para usar texturas

**Issue**: "Implementar carga de texturas en componente Planet"

- Importar useTexture de React Three Fiber
- Cargar textura especificada en props
- Aplicar textura al material
- Mantener fallback a color si falla

---

### Tarea 5.6: Modificar Sun para textura

**Issue**: "Aplicar textura al componente Sun"

- Cargar textura del Sol
- Aplicar al material emisivo
- Ajustar intensidad de emisión

---

### Tarea 5.7: Ajustar iluminación para texturas

**Issue**: "Optimizar iluminación para texturas realistas"

- Modificar componente Lights
- Ajustar intensidad para visibilidad de texturas
- Balancear luz ambiental y direccional

---

### Tarea 5.8: Optimizar carga de texturas

**Issue**: "Implementar lazy loading de texturas"

- Carga asíncrona de texturas
- Agregar Suspense si es necesario
- Considerar placeholders durante carga

---

### Tarea 5.9: Verificar renderizado con texturas

**Issue**: "Verificar aplicación correcta de texturas"

- Ejecutar aplicación
- Verificar cada planeta muestra textura correcta
- Verificar que no hay errores de carga
- Verificar performance (FPS)

---

### Tarea 5.10: Documentar assets y atribuciones

**Issue**: "Documentar fuentes de texturas"

- Crear archivo `public/textures/README.md`
- Listar fuente de cada textura
- Agregar atribuciones necesarias
- Verificar licencias de uso

---

**⚠️ FIN DE FASE 5 - CHECKPOINT**

- Crear PR develop → main: "FASE 5: Mejoras visuales - Texturas"
- DETENER, NOTIFICAR y ESPERAR APROBACIÓN

---

## FASE 6: ÓRBITAS Y ANIMACIONES

**⚠️ INICIO DE FASE**: Crear issue "FASE 6: Órbitas y animaciones"
**📋 APLICAR FLUJO DE TEMPLATE PARA CADA TAREA**

### Tarea 6.1: Crear componente Orbit

**Issue**: "Crear componente Orbit para líneas orbitales"

- Crear `src/components/Scene/Orbit.tsx`
- Usar BufferGeometry o Ring para línea circular
- Recibir radio como prop
- Material semi-transparente

### Tarea 6.2: Renderizar órbitas

**Issue**: "Renderizar órbitas de todos los planetas"

- Agregar Orbit components en SolarSystemCanvas
- Mapear planetas para crear órbitas
- Usar distancia como radio

### Tarea 6.3: Rotación sobre eje propio

**Issue**: "Implementar rotación de planetas sobre su eje"

- Usar useFrame en Planet
- Actualizar rotación Y cada frame
- Velocidad basada en datos del planeta

### Tarea 6.4: Movimiento orbital

**Issue**: "Implementar movimiento orbital de planetas"

- Usar useFrame para actualizar posición
- Calcular con seno/coseno
- Velocidad orbital desde datos

### Tarea 6.5: Sincronizar animaciones

**Issue**: "Sincronizar animaciones con clock"

- Usar parámetro de tiempo de useFrame
- Animaciones consistentes
- Sin saltos

### Tarea 6.6: Control de velocidad de simulación

**Issue**: "Crear control de velocidad de tiempo"

- Estado timeScale
- Pausar/reanudar
- Acelerar/desacelerar

### Tarea 6.7: UI control de velocidad

**Issue**: "Crear UI para controlar velocidad de tiempo"

- Crear `src/components/UI/TimeControl.tsx`
- Botones play/pause
- Slider de velocidad
- Estilos consistentes

### Tarea 6.8: Anillo de Saturno

**Issue**: "Agregar anillo a Saturno"

- Modificar Planet o crear variante
- RingGeometry alrededor de Saturno
- Textura o color apropiado

### Tarea 6.9: Verificar animaciones

**Issue**: "Verificar todas las animaciones"

- Rotación de planetas
- Movimiento orbital
- Controles de velocidad
- Performance

### Tarea 6.10: Optimizar performance de animaciones

**Issue**: "Optimizar performance de animaciones"

- Verificar FPS
- Optimizar cálculos
- Reducir complejidad si necesario

**⚠️ FIN DE FASE 6 - CHECKPOINT**

---

## FASE 7: NAVEGACIÓN DE CÁMARA

**⚠️ INICIO DE FASE**: Crear issue "FASE 7: Navegación de cámara"
**📋 APLICAR FLUJO DE TEMPLATE PARA CADA TAREA**

### Tarea 7.1: Sistema de cámara enfocada

**Issue**: "Crear hook para animación de cámara"

- Crear `src/hooks/useCameraAnimation.ts`
- Estado para posición objetivo
- Estado para lookAt
- Función de animación

### Tarea 7.2: Animación suave de cámara

**Issue**: "Implementar interpolación suave de cámara"

- Usar useFrame para interpolación
- Lerp para suavizar
- Animar posición y lookAt

### Tarea 7.3: Conectar selección con cámara

**Issue**: "Conectar selección de planeta con cámara"

- Al seleccionar planeta, calcular posición
- Distancia apropiada del planeta
- Iniciar transición

### Tarea 7.4: Botones de navegación rápida

**Issue**: "Crear botones de navegación rápida a planetas"

- Crear `src/components/UI/PlanetNavigation.tsx`
- Botón por planeta
- Mini-ícono o color

### Tarea 7.5: Botón vista general

**Issue**: "Agregar botón para vista general"

- Botón para volver a vista completa
- Posición que muestre todos los planetas
- Resetear vista

### Tarea 7.6: Zoom apropiado por planeta

**Issue**: "Calcular zoom dinámico basado en tamaño"

- Distancia basada en tamaño del planeta
- Júpiter más lejos, Mercurio más cerca
- Mantener planeta completo en vista

### Tarea 7.7: Ajustar OrbitControls

**Issue**: "Sincronizar OrbitControls con animaciones"

- Desactivar durante transición
- Reactivar al finalizar
- Actualizar target

### Tarea 7.8: Indicadores visuales

**Issue**: "Agregar indicadores de navegación"

- Resaltar botón de planeta activo
- Mostrar nombre actual
- Mini-mapa (opcional)

### Tarea 7.9: Verificar navegación

**Issue**: "Verificar sistema de navegación completo"

- Clicks en planetas
- Botones de navegación
- Transiciones suaves
- OrbitControls

### Tarea 7.10: Pulir transiciones

**Issue**: "Optimizar y pulir transiciones de cámara"

- Duración apropiada
- Easing functions
- Sin lag

**⚠️ FIN DE FASE 7 - CHECKPOINT**

---

## FASE 8: PULIDO DE UI/UX

**⚠️ INICIO DE FASE**: Crear issue "FASE 8: Pulido de UI/UX"
**📋 APLICAR FLUJO DE TEMPLATE PARA CADA TAREA**

### Tarea 8.1: Sistema de estilos globales

**Issue**: "Crear sistema de estilos globales"

- Crear `src/styles/global.css`
- Variables CSS para colores
- Fuentes y tamaños
- Estilos base

### Tarea 8.2: Paleta de colores espacial

**Issue**: "Definir paleta de colores del tema"

- Colores principales
- Estados (hover, active)
- Variables CSS

### Tarea 8.3: Mejorar panel de información

**Issue**: "Rediseñar panel de información de planetas"

- Header con nombre
- Secciones claras
- Iconos (opcional)
- Glass-morphism

### Tarea 8.4: Estilos de botones

**Issue**: "Diseñar sistema de botones consistente"

- Estilo base de botones
- Efectos hover/active
- Transiciones
- Accesibilidad

### Tarea 8.5: Loading screen

**Issue**: "Crear pantalla de carga inicial"

- Crear `src/components/UI/LoadingScreen.tsx`
- Animación de carga
- Texto informativo
- Transición suave

### Tarea 8.6: Header/navbar

**Issue**: "Crear header de la aplicación"

- Crear `src/components/UI/Header.tsx`
- Título del proyecto
- Transparente/semi-transparente
- Fixed top

### Tarea 8.7: Tooltips

**Issue**: "Agregar tooltips informativos"

- Tooltips al hover en planetas
- Nombre + dato rápido
- Delay apropiado

### Tarea 8.8: UI responsive

**Issue**: "Hacer interfaz responsive"

- Panel info en móvil (overlay)
- Botones adaptados
- Reorganizar elementos
- Touch events

### Tarea 8.9: Transiciones y micro-interacciones

**Issue**: "Agregar animaciones y micro-interacciones"

- Animaciones de panel
- Hover effects
- Click feedback
- Easings

### Tarea 8.10: Performance visual

**Issue**: "Optimizar performance de renderizado"

- Verificar FPS
- Reducir complejidad si necesario
- Optimizar texturas
- LOD (opcional)

### Tarea 8.11: Verificar UI completa

**Issue**: "Testing completo de interfaz"

- Probar toda la UI
- Consistencia visual
- Móvil y desktop
- Accesibilidad básica

### Tarea 8.12: Ajustes finales de diseño

**Issue**: "Ajustes finales y pulido de diseño"

- Detalles visuales
- Espaciados
- Colores finales
- Cleanup

**⚠️ FIN DE FASE 8 - CHECKPOINT**

---

## FASE 9: OPTIMIZACIÓN Y PERFORMANCE

**⚠️ INICIO DE FASE**: Crear issue "FASE 9: Optimización y performance"
**📋 APLICAR FLUJO DE TEMPLATE PARA CADA TAREA**

### Tarea 9.1: React.memo en componentes

**Issue**: "Implementar React.memo en componentes"

- Identificar componentes con re-renders innecesarios
- Envolver con React.memo
- Verificar funcionalidad

### Tarea 9.2: Optimizar re-renders

**Issue**: "Optimizar re-renders de escena 3D"

- useMemo para objetos estáticos
- useCallback para funciones
- Evitar nuevas referencias

### Tarea 9.3: Lazy loading de componentes

**Issue**: "Implementar lazy loading"

- React.lazy para componentes UI grandes
- Suspense con fallback
- Lazy load panel y controles

### Tarea 9.4: Optimizar texturas

**Issue**: "Optimizar carga y tamaño de texturas"

- Verificar tamaños
- Comprimir imágenes
- Considerar WebP
- Progressive loading

### Tarea 9.5: Code splitting

**Issue**: "Configurar code splitting"

- Verificar code splitting de Vite
- Revisar bundles
- Separar vendors
- Chunks de tamaño razonable

### Tarea 9.6: Limpiar código

**Issue**: "Limpiar código no utilizado"

- Eliminar imports no usados
- Eliminar código comentado
- Eliminar console.logs
- Cleanup general

### Tarea 9.7: Error boundaries

**Issue**: "Agregar error boundaries"

- Crear ErrorBoundary component
- Envolver aplicación
- Mensaje amigable en errores
- Logging

### Tarea 9.8: Analizar bundle size

**Issue**: "Optimizar bundle size"

- Analizar con bundle visualizer
- Identificar dependencias pesadas
- Alternativas livianas
- Tree-shaking

### Tarea 9.9: Verificar performance final

**Issue**: "Verificación completa de performance"

- Build de producción
- Medir FPS
- Tiempo de carga
- Diferentes navegadores
- Lighthouse

### Tarea 9.10: Documentar optimizaciones

**Issue**: "Documentar optimizaciones realizadas"

- Listar optimizaciones
- Métricas antes/después
- Agregar a README

**⚠️ FIN DE FASE 9 - CHECKPOINT**

---

## FASE 10: DOCUMENTACIÓN Y PREPARACIÓN PARA DEPLOY

**⚠️ INICIO DE FASE**: Crear issue "FASE 10: Documentación y preparación"
**📋 APLICAR FLUJO DE TEMPLATE PARA CADA TAREA**

### Tarea 10.1: Actualizar README completo

**Issue**: "Actualizar README con documentación completa"

- Descripción detallada
- Screenshots o GIF
- Características principales
- Instrucciones de instalación
- Comandos disponibles

### Tarea 10.2: Documentar stack tecnológico

**Issue**: "Documentar tecnologías utilizadas"

- Listar tecnologías
- Versiones principales
- Por qué se eligió cada una
- Enlaces a docs oficiales

### Tarea 10.3: Sección de desarrollo

**Issue**: "Agregar sección de desarrollo al README"

- Estructura de carpetas
- Organización de código
- Convenciones
- Guías de contribución

### Tarea 10.4: Variables de entorno ejemplo

**Issue**: "Crear archivo .env.example"

- Crear `.env.example`
- Documentar variables (si hay)
- Instrucciones de configuración
- Verificar .gitignore

### Tarea 10.5: Comentarios en código

**Issue**: "Agregar comentarios JSDoc en código complejo"

- Revisar componentes principales
- JSDoc comments
- Explicar lógica compleja
- Documentar props

### Tarea 10.6: LICENSE file

**Issue**: "Agregar archivo LICENSE"

- Elegir licencia (MIT recomendado)
- Crear LICENSE en raíz
- Año y nombre

### Tarea 10.7: Verificar seguridad

**Issue**: "Verificar que no hay secretos expuestos"

- Revisar código
- No API keys hardcoded
- .env en .gitignore
- Revisar historial git

### Tarea 10.8: CHANGELOG

**Issue**: "Crear archivo CHANGELOG.md"

- Crear CHANGELOG.md
- Versión inicial
- Listar features
- Formato Keep a Changelog

### Tarea 10.9: Verificar build local

**Issue**: "Verificar build de producción local"

- `pnpm build`
- Sin errores
- `pnpm preview`
- Probar funcionalidad

### Tarea 10.10: Cleanup final

**Issue**: "Cleanup final antes de deploy"

- Revisar todos los archivos
- Eliminar TODOs innecesarios
- Verificar consistencia
- Último review

**⚠️ FIN DE FASE 10 - CHECKPOINT**

---

## FASE 11: DEPLOY EN VERCEL

**⚠️ INICIO DE FASE**: Crear issue "FASE 11: Deploy en Vercel"
**📋 APLICAR FLUJO DE TEMPLATE PARA CADA TAREA**

### Tarea 11.1: Verificar repositorio

**Issue**: "Verificar estado del repositorio antes de deploy"

- Todo pusheado a GitHub
- Main actualizado
- Último build funciona
- Sin commits pendientes

### Tarea 11.2: Configurar proyecto para Vercel

**Issue**: "Configurar settings de Vercel"

- Crear/verificar `vercel.json`
- Settings de build
- Output directory: dist
- Build command: pnpm build

### Tarea 11.3: Inicializar en Vercel

**Issue**: "Inicializar proyecto en Vercel vía CLI"

- Comando Vercel CLI
- Seleccionar scope
- Detectar Vite
- Nombre del proyecto

### Tarea 11.4: Configurar deployment settings

**Issue**: "Configurar settings de deployment"

- Framework preset: Vite
- Build command
- Output directory
- Install command
- Node.js version

### Tarea 11.5: Variables de entorno

**Issue**: "Configurar variables de entorno en Vercel"

- Agregar variables si existen
- Ambiente de producción
- Guardar configuración

### Tarea 11.6: Primer deploy

**Issue**: "Ejecutar primer deploy a Vercel"

- Confirmar y ejecutar
- Esperar build
- Verificar log
- Obtener URL preview

### Tarea 11.7: Verificar deployment

**Issue**: "Verificar deployment en Vercel"

- Abrir URL generada
- Probar funcionalidad
- Verificar texturas
- Verificar animaciones
- Probar en diferentes dispositivos

### Tarea 11.8: Dominio custom (opcional)

**Issue**: "Configurar dominio personalizado"

- Agregar dominio en Vercel (si tienes)
- Configurar DNS
- Esperar propagación
- Verificar acceso

### Tarea 11.9: Deploy automático

**Issue**: "Configurar deploy automático"

- Verificar auto-deploy activo
- Hacer cambio pequeño de prueba
- Push a GitHub
- Verificar deploy automático
- Confirmar funcionamiento

### Tarea 11.10: Badge de deploy

**Issue**: "Agregar badge de Vercel al README"

- Obtener badge de Vercel
- Agregar a README
- Link al sitio live
- Commit y push

### Tarea 11.11: Documentar URL

**Issue**: "Documentar URL de producción"

- URL en README
- URL en descripción del repo
- URL en About de GitHub

### Tarea 11.12: Verificación final producción

**Issue**: "Verificación final en producción"

- Visitar sitio
- Probar features
- Verificar performance
- Analytics (opcional)

### Tarea 11.13: Configurar dominio en GitHub

**Issue**: "Actualizar información del repositorio"

- URL en repositorio
- Topics/tags en GitHub
- Descripción actualizada

**⚠️ FIN DE FASE 11 - CHECKPOINT**

---

## FASE 12: POST-DEPLOY Y CALIDAD

**⚠️ INICIO DE FASE**: Crear issue "FASE 12: Post-deploy y calidad"
**📋 APLICAR FLUJO DE TEMPLATE PARA CADA TAREA**

### Tarea 12.1: Issues para mejoras futuras

**Issue**: "Crear issues para mejoras futuras"

- Features no implementadas
- Optimizaciones identificadas
- Bugs conocidos
- Etiquetar apropiadamente

### Tarea 12.2: GitHub Pages alternativo (opcional)

**Issue**: "Configurar GitHub Pages como respaldo"

- Configurar GitHub Pages
- GitHub Actions workflow
- Verificar funcionamiento

### Tarea 12.3: Meta tags SEO

**Issue**: "Agregar meta tags para SEO"

- Título descriptivo
- Meta description
- Open Graph tags
- Favicon

### Tarea 12.4: Accesibilidad

**Issue**: "Verificar accesibilidad básica"

- Contraste de colores
- Navegación por teclado
- Labels en elementos
- Herramientas: axe, Lighthouse

### Tarea 12.5: Screenshots para portafolio

**Issue**: "Crear assets promocionales del proyecto"

- Screenshots alta calidad
- GIF o video demo
- Agregar a docs/ o README

### Tarea 12.6: Compartir proyecto

**Issue**: "Promocionar proyecto"

- Link en portafolio personal
- LinkedIn
- Redes sociales dev
- GitHub profile README

### Tarea 12.7: Monitorear analytics

**Issue**: "Configurar y monitorear analytics"

- Analytics de Vercel
- Identificar issues
- Performance metrics
- Notas de mejoras

### Tarea 12.8: Tag de versión

**Issue**: "Crear release v1.0.0"

- Git tag: v1.0.0
- Push tag
- GitHub release
- Changelog

### Tarea 12.9: Backup

**Issue**: "Asegurar backups del proyecto"

- Backup local
- Repositorio accesible
- Fork o export

### Tarea 12.10: Documentar aprendizajes

**Issue**: "Documentar lecciones aprendidas"

- Lecciones aprendidas
- Dificultades
- Skills mejoradas
- Notas para próximo proyecto

**⚠️ FIN DE FASE 12 - CHECKPOINT FINAL**

---

## NOTAS FINALES

### Comandos Útiles de Referencia

**Desarrollo:**

```bash
pnpm install          # Instalar dependencias
pnpm dev             # Servidor de desarrollo
pnpm build           # Build para producción
pnpm preview         # Preview del build
```

**Git - Flujo Diario:**

```bash
# Iniciar nueva tarea
git checkout develop
git pull
git checkout -b feature/[issue-number]-[descripcion]

# Durante desarrollo
git status
git add .
git commit -m "descripción del cambio"
git push -u origin feature/[issue-number]-[descripcion]

# Después de merge de PR
git checkout develop
git pull
git branch -d feature/[issue-number]-[descripcion]  # Eliminar rama local

# Verificar estado
git branch -a        # Ver todas las ramas
git log --oneline    # Ver historial
```

**GitHub CLI - Gestión de Issues y PRs:**

```bash
# Issues
gh issue create --title "Título" --body "Descripción"
gh issue list
gh issue view [número]
gh issue close [número]

# Pull Requests
gh pr create --base develop --title "Título" --body "Descripción"
gh pr list
gh pr view [número]
gh pr merge [número]
gh pr checkout [número]  # Para revisar localmente

# Repositorio
gh repo view
gh browse
```

**Vercel CLI:**

```bash
vercel              # Deploy
vercel --prod       # Deploy a producción
vercel ls           # Listar proyectos
vercel inspect      # Inspeccionar deployment
vercel logs         # Ver logs
```

---

### Flujo Detallado de Git por Tarea

**1. Preparación:**

```bash
git checkout develop
git pull origin develop
```

**2. Crear issue en GitHub:**

```bash
gh issue create --title "[TAREA] Descripción" --body "Detalles de la tarea"
# Anotar el número de issue generado (ej: #15)
```

**3. Crear rama feature:**

```bash
git checkout -b feature/15-descripcion-corta
```

**4. Desarrollar:**

- Escribir código
- Probar localmente

**5. Commit:**

```bash
git add .
git commit -m "feat: descripción del cambio (closes #15)"
```

**6. Push:**

```bash
git push -u origin feature/15-descripcion-corta
```

**7. Crear Pull Request:**

```bash
gh pr create --base develop --head feature/15-descripcion-corta --title "Título del PR" --body "Descripción. Closes #15"
```

**8. Code Review:**

- Revisar cambios en GitHub
- Probar localmente si es necesario:

```bash
gh pr checkout [número-pr]
pnpm dev  # Probar
git checkout develop  # Volver a develop
```

**9. Si requiere cambios:**

```bash
git checkout feature/15-descripcion-corta
# Hacer cambios
git add .
git commit -m "fix: correcciones del code review"
git push
# El PR se actualiza automáticamente
```

**10. Si se aprueba:**

```bash
gh pr merge [número-pr] --squash  # o --merge
git checkout develop
git pull origin develop
git branch -d feature/15-descripcion-corta
```

**11. Cerrar issue (si no se cerró automáticamente):**

```bash
gh issue close 15
```

---

### Flujo de Fin de Fase

**1. Verificar que todas las tareas están mergeadas:**

```bash
git checkout develop
git pull origin develop
git log --oneline -20  # Ver últimos commits
```

**2. Verificar build:**

```bash
pnpm build
pnpm preview
# Probar la aplicación
```

**3. Crear PR develop → main:**

```bash
gh pr create --base main --head develop --title "FASE [N]: Nombre de la fase" --body "Resumen de tareas completadas. Closes #[issue-fase]"
```

**4. DETENER Y NOTIFICAR:**

- No continuar con siguiente fase
- Esperar aprobación manual del PR

**5. Después de aprobación:**

```bash
gh pr merge [número-pr] --merge
git checkout develop
git pull origin develop
git checkout main
git pull origin main
# Ahora main y develop están sincronizados
git checkout develop  # Volver a develop para siguiente fase
```

---

### Convenciones de Mensajes de Commit

Usar formato conventional commits:

```
feat: nueva característica
fix: corrección de bug
docs: cambios en documentación
style: cambios de formato (sin cambio de código)
refactor: refactorización de código
test: agregar o modificar tests
chore: tareas de mantenimiento

Ejemplos:
feat: add planet selection functionality
fix: correct texture loading issue
docs: update README with installation steps
refactor: optimize planet rendering performance
```

---

### Checklist de Code Review

Para cada PR, verificar:

**Funcionalidad:**

- [ ] El código hace lo que dice que hace
- [ ] No hay errores de TypeScript
- [ ] La aplicación corre sin errores en consola
- [ ] La funcionalidad se probó localmente

**Calidad de Código:**

- [ ] Código legible y bien organizado
- [ ] Nombres de variables/funciones descriptivos
- [ ] No hay código comentado innecesario
- [ ] No hay console.logs de debug

**Git:**

- [ ] Commits con mensajes descriptivos
- [ ] No hay archivos innecesarios (node_modules, .env, etc.)
- [ ] El PR está asociado al issue correcto

**Performance:**

- [ ] No introduce problemas de performance obvios
- [ ] Imports optimizados

---

### Resolución de Problemas Comunes

**Merge Conflicts:**

```bash
git checkout develop
git pull origin develop
git checkout feature/tu-rama
git merge develop
# Resolver conflictos manualmente
git add .
git commit -m "resolve merge conflicts"
git push
```

**Forgot to create branch from develop:**

```bash
# Si ya hiciste commits en develop por error
git checkout -b feature/nueva-rama
git checkout develop
git reset --hard origin/develop
git checkout feature/nueva-rama
# Ahora tus commits están en la rama feature
```

**Need to update branch with latest develop:**

```bash
git checkout feature/tu-rama
git fetch origin
git rebase origin/develop
# Resolver conflictos si hay
git push --force-with-lease
```

---

### Estructura de Issues Recomendada

**Issue de Fase:**

```markdown
Título: FASE [N]: [Nombre de la fase]

Descripción:

## Objetivo

[Descripción de qué se logrará en esta fase]

## Tareas

- [ ] Tarea 1
- [ ] Tarea 2
      ...

## Criterios de Aceptación

- Todas las tareas completadas
- Build exitoso
- Funcionalidad probada

## Notas

[Cualquier consideración especial]
```

**Issue de Tarea:**

```markdown
Título: [Descripción concisa de la tarea]

Descripción:

## Objetivo

[Qué se va a implementar/modificar]

## Pasos

1. Paso 1
2. Paso 2
   ...

## Archivos Afectados

- src/components/...
- src/utils/...

## Criterios de Aceptación

- [ ] Funcionalidad implementada
- [ ] Sin errores TypeScript
- [ ] Probado localmente

## Related

Parte de #[número-issue-fase]
```

---

### Criterios de Completitud por Fase

Cada fase se considera completa cuando:

1. ✅ Todas las tareas están ejecutadas y mergeadas a `develop`
2. ✅ Todos los issues de tareas están cerrados
3. ✅ El código compila sin errores TypeScript
4. ✅ `pnpm build` completa exitosamente
5. ✅ La aplicación funciona correctamente en `pnpm preview`
6. ✅ Se ha creado PR `develop -> main`
7. ✅ Se ha **DETENIDO** el desarrollo
8. ✅ Se ha **NOTIFICADO** que la fase está lista
9. ⏸️ Se está **ESPERANDO** aprobación manual

---

### Mejores Prácticas a Seguir

**1. Git/GitHub:**

- Commits frecuentes con mensajes descriptivos
- Una rama por tarea (nunca trabajar directo en develop)
- PRs pequeños y enfocados (más fácil de revisar)
- Cerrar issues al completar tareas
- Mantener develop siempre funcional

**2. Desarrollo:**

- Probar cada cambio localmente antes de push
- Verificar que no hay errores de TypeScript
- Limpiar console.logs antes de PR
- Mantener código legible y organizado

**3. Code Review:**

- Revisar tu propio código antes de crear PR
- Probar la funcionalidad, no solo leer código
- Ser descriptivo en las descripciones de PRs
- Documentar decisiones importantes

**4. Performance:**

- Monitorear FPS durante desarrollo
- Verificar tamaño de texturas
- Probar en diferentes dispositivos cuando sea posible
- Build y preview antes de cada PR a main

**5. Comunicación:**

- Issues claros y descriptivos
- PRs con descripción de cambios
- Notificar cuando una fase está lista
- Documentar problemas encontrados

---

**Fin del Plan de Trabajo**

Este plan está diseñado para ser ejecutado de forma secuencial con un flujo de trabajo profesional usando Git Flow. Cada tarea tiene su propio ciclo de desarrollo aislado, lo que permite un desarrollo organizado, revisable y fácil de rastrear.

El flujo de **DETENER → NOTIFICAR → ESPERAR APROBACIÓN** al final de cada fase asegura que haya checkpoints de revisión manual antes de avanzar a nuevas funcionalidades.

¡Éxito con tu proyecto! 🚀
