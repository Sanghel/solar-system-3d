import { SolarSystemCanvas } from './components/Scene/SolarSystemCanvas';
import { Lights } from './components/Scene/Lights';
import { Sun } from './components/Scene/Sun';
import { Planet } from './components/Scene/Planet';
import { planets } from './data/planets';

function App() {
  // Filter out the Sun, render only planets
  const planetsToRender = planets.filter((p) => p.type !== 'star');

  return (
    <SolarSystemCanvas>
      <Lights />
      <Sun />
      {planetsToRender.map((planet) => (
        <Planet key={planet.id} planet={planet} />
      ))}
    </SolarSystemCanvas>
  );
}

export default App;
