import { Suspense, useState } from "react";
import { SolarSystemCanvas } from "./components/Scene/SolarSystemCanvas";
import { Lights } from "./components/Scene/Lights";
import { Sun } from "./components/Scene/Sun";
import { Planet } from "./components/Scene/Planet";
import { Orbit } from "./components/Scene/Orbit";
import { PlanetInfo } from "./components/UI/PlanetInfo";
import { PlanetNavigation } from "./components/UI/PlanetNavigation";
import { SceneLoader } from "./components/UI/LoadingScreen";
import { TimeControl } from "./components/UI/TimeControl";
import { planets } from "./data/planets";
import { usePlanetSelection } from "./hooks/usePlanetSelection";
import { getOrbitRadius } from "./utils/orbitUtils";

function App() {
  const { selectedPlanet, selectPlanet, deselectPlanet } = usePlanetSelection();
  const [overviewTrigger, setOverviewTrigger] = useState(0);

  // Filter out the Sun, render only planets
  const planetsToRender = planets.filter((p) => p.type !== "star");

  const handleOverview = () => {
    deselectPlanet();
    setOverviewTrigger((t) => t + 1);
  };

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

      <PlanetNavigation
        planets={planetsToRender}
        selectedPlanet={selectedPlanet}
        onSelectPlanet={selectPlanet}
        onOverview={handleOverview}
      />
      <PlanetInfo planet={selectedPlanet} onClose={deselectPlanet} />
      <TimeControl />
    </>
  );
}

export default App;
