import { Suspense, useState, useCallback, useMemo, lazy } from "react";
import { SolarSystemCanvas } from "./components/Scene/SolarSystemCanvas";
import { Lights } from "./components/Scene/Lights";
import { Sun } from "./components/Scene/Sun";
import { Planet } from "./components/Scene/Planet";
import { Orbit } from "./components/Scene/Orbit";
import { Header } from "./components/UI/Header";
import { Attribution } from "./components/UI/Attribution";
import { FloatingMenuButton } from "./components/UI/FloatingMenuButton";
import { PlanetDrawer } from "./components/UI/PlanetDrawer";
import { LoadingOverlay } from "./components/UI/LoadingScreen";

const PlanetInfo = lazy(() =>
  import("./components/UI/PlanetInfo").then((m) => ({ default: m.PlanetInfo }))
);
const PlanetNavigation = lazy(() =>
  import("./components/UI/PlanetNavigation").then((m) => ({ default: m.PlanetNavigation }))
);
const TimeControl = lazy(() =>
  import("./components/UI/TimeControl").then((m) => ({ default: m.TimeControl }))
);
import { planets } from "./data/planets";
import { usePlanetSelection } from "./hooks/usePlanetSelection";
import { getOrbitRadius } from "./utils/orbitUtils";
import type { Planet as PlanetType } from "./types/planet";

function App() {
  const { selectedPlanet, selectPlanet, deselectPlanet } = usePlanetSelection();
  const [overviewTrigger, setOverviewTrigger] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  // Tracks whether the info panel is visible — decoupled from selection so
  // mobile users can hide the panel without losing the selected planet/camera.
  const [panelVisible, setPanelVisible] = useState(false);

  const planetsToRender = useMemo(
    () => planets.filter((p) => p.type !== "star"),
    []
  );

  const handleSelectPlanet = useCallback((planet: PlanetType) => {
    selectPlanet(planet);
    setPanelVisible(true);
    setDrawerOpen(false);
  }, [selectPlanet]);

  const handleDeselectPlanet = useCallback(() => {
    deselectPlanet();
    setPanelVisible(false);
  }, [deselectPlanet]);

  const handleOverview = useCallback(() => {
    deselectPlanet();
    setPanelVisible(false);
    setOverviewTrigger((t) => t + 1);
  }, [deselectPlanet]);

  // FAB has two modes:
  // - No planet selected → opens/closes the planet drawer
  // - Planet selected → toggles the info panel visibility
  const handleFabClick = useCallback(() => {
    if (selectedPlanet) {
      setPanelVisible((v) => !v);
    } else {
      setDrawerOpen((v) => !v);
    }
  }, [selectedPlanet]);

  const fabIsActive = selectedPlanet ? panelVisible : drawerOpen;

  return (
    <>
      {/* Loading overlay — real DOM element so Lighthouse detects it as FCP */}
      <LoadingOverlay />

      <SolarSystemCanvas
        onBackgroundClick={handleDeselectPlanet}
        selectedPlanet={selectedPlanet}
        overviewTrigger={overviewTrigger}
      >
        <Suspense fallback={null}>
          <Lights />
          <Sun />
          {planetsToRender.map((planet) => (
            <Orbit
              key={`orbit-${planet.id}`}
              radius={getOrbitRadius(planet.distanceFromSun, planet.id)}
            />
          ))}
          {planetsToRender.map((planet, index) => (
            <Planet
              key={planet.id}
              planet={planet}
              index={index}
              onSelect={handleSelectPlanet}
              isSelected={selectedPlanet?.id === planet.id}
            />
          ))}
        </Suspense>
      </SolarSystemCanvas>

      <Header />
      <Suspense fallback={null}>
        <PlanetNavigation
          planets={planetsToRender}
          selectedPlanet={selectedPlanet}
          onSelectPlanet={handleSelectPlanet}
          onOverview={handleOverview}
        />
        <div aria-live="polite" aria-atomic="true" className="sr-only">
          {selectedPlanet ? `Viewing ${selectedPlanet.name}` : "Overview — all planets"}
        </div>
        {/* Panel renders whenever a planet is selected AND panelVisible is true.
            On desktop the FAB is hidden so panelVisible stays true once set.
            On mobile the FAB toggles panelVisible independently of selection. */}
        {selectedPlanet && panelVisible && (
          <PlanetInfo planet={selectedPlanet} onClose={handleDeselectPlanet} />
        )}
        <TimeControl />
      </Suspense>

      <FloatingMenuButton
        isOpen={fabIsActive}
        hasPlanetSelected={!!selectedPlanet}
        onClick={handleFabClick}
      />
      <PlanetDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onSelectPlanet={handleSelectPlanet}
        planets={planetsToRender}
        selectedPlanet={selectedPlanet}
      />
      <Attribution />
    </>
  );
}

export default App;
