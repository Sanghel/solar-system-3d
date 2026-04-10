import { Suspense, useState, useCallback, useMemo, lazy } from "react";
import { SolarSystemCanvas } from "./components/Scene/SolarSystemCanvas";
import { Lights } from "./components/Scene/Lights";
import { Sun } from "./components/Scene/Sun";
import { Planet } from "./components/Scene/Planet";
import { Orbit } from "./components/Scene/Orbit";
import { SceneLoader } from "./components/UI/LoadingScreen";
import { Header } from "./components/UI/Header";
import { Attribution } from "./components/UI/Attribution";

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

function App() {
  const { selectedPlanet, selectPlanet, deselectPlanet } = usePlanetSelection();
  const [overviewTrigger, setOverviewTrigger] = useState(0);

  const planetsToRender = useMemo(
    () => planets.filter((p) => p.type !== "star"),
    []
  );

  const handleOverview = useCallback(() => {
    deselectPlanet();
    setOverviewTrigger((t) => t + 1);
  }, [deselectPlanet]);

  return (
    <>
      <SolarSystemCanvas
        onBackgroundClick={deselectPlanet}
        selectedPlanet={selectedPlanet}
        overviewTrigger={overviewTrigger}
      >
        <Suspense fallback={<SceneLoader />}>
          <Lights />
          <Sun />
          {/* Orbit lines for all planets */}
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
              onSelect={selectPlanet}
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
          onSelectPlanet={selectPlanet}
          onOverview={handleOverview}
        />
        <div aria-live="polite" aria-atomic="true" className="sr-only">
          {selectedPlanet ? `Viewing ${selectedPlanet.name}` : "Overview — all planets"}
        </div>
        <PlanetInfo planet={selectedPlanet} onClose={deselectPlanet} />
        <TimeControl />
      </Suspense>
      <Attribution />
    </>
  );
}

export default App;
