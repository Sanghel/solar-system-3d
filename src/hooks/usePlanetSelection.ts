import { useState, useCallback } from 'react';
import { Planet } from '../types/planet';

interface UsePlanetSelectionReturn {
  selectedPlanet: Planet | null;
  selectPlanet: (planet: Planet) => void;
  deselectPlanet: () => void;
}

export const usePlanetSelection = (): UsePlanetSelectionReturn => {
  const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(null);

  const selectPlanet = useCallback((planet: Planet) => {
    setSelectedPlanet(planet);
  }, []);

  const deselectPlanet = useCallback(() => {
    setSelectedPlanet(null);
  }, []);

  return {
    selectedPlanet,
    selectPlanet,
    deselectPlanet,
  };
};
