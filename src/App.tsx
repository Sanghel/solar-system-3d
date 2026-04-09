import { SolarSystemCanvas } from './components/Scene/SolarSystemCanvas';
import { Lights } from './components/Scene/Lights';
import { Sun } from './components/Scene/Sun';

function App() {
  return (
    <SolarSystemCanvas>
      <Lights />
      <Sun />
    </SolarSystemCanvas>
  );
}

export default App;
