import { SolarSystemCanvas } from './components/Scene/SolarSystemCanvas';
import { Lights } from './components/Scene/Lights';
import { Sun } from './components/Scene/Sun';
import { Planet } from './components/Scene/Planet';
import { planets } from './data/planets';
import { usePlanetSelection } from './hooks/usePlanetSelection';

function App() {
  const { selectedPlanet, selectPlanet } = usePlanetSelection();

  // Filter out the Sun, render only planets
  const planetsToRender = planets.filter((p) => p.type !== 'star');

  return (
    <SolarSystemCanvas>
      <Lights />
      <Sun />
      {planetsToRender.map((planet, index) => (
        <Planet
          key={planet.id}
          planet={planet}
          index={index}
          onSelect={selectPlanet}
          isSelected={selectedPlanet?.id === planet.id}
        />
      ))}
    </SolarSystemCanvas>
  );
}

export default App;
