import { useState, useCallback } from 'react';
import { Planet } from '../types/planet';

interface UsePlanetSelectionReturn {
  /** Currently selected planet, or null if none selected */
  selectedPlanet: Planet | null;
  /** Select a planet and update state */
  selectPlanet: (planet: Planet) => void;
  /** Deselect the current planet */
  deselectPlanet: () => void;
}

/**
 * Hook for managing planet selection state globally
 * @returns Object with selectedPlanet state and selection/deselection functions
 */
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
