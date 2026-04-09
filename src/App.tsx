import { useState } from 'react';
import { SolarSystemCanvas } from './components/Scene/SolarSystemCanvas';
import { Lights } from './components/Scene/Lights';
import { Sun } from './components/Scene/Sun';
import { Planet } from './components/Scene/Planet';
import { SelectionRing } from './components/Scene/SelectionRing';
import { planets } from './data/planets';
import { usePlanetSelection } from './hooks/usePlanetSelection';

function App() {
  const { selectedPlanet, selectPlanet, deselectPlanet } = usePlanetSelection();
  const [selectedPlanetPosition, setSelectedPlanetPosition] = useState<[number, number, number] | null>(null);

  // Filter out the Sun, render only planets
  const planetsToRender = planets.filter((p) => p.type !== 'star');

  return (
    <SolarSystemCanvas onBackgroundClick={deselectPlanet}>
      <Lights />
      <Sun />
      {planetsToRender.map((planet, index) => (
        <Planet
          key={planet.id}
          planet={planet}
          index={index}
          onSelect={selectPlanet}
          isSelected={selectedPlanet?.id === planet.id}
          onPlanetPosition={setSelectedPlanetPosition}
        />
      ))}
      <SelectionRing planet={selectedPlanet} planetPosition={selectedPlanetPosition} />
    </SolarSystemCanvas>
  );
}

export default App;
