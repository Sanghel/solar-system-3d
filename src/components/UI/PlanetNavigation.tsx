import { memo } from "react";
import type { Planet } from "../../types/planet";
import "./PlanetNavigation.css";

interface PlanetNavigationProps {
  planets: Planet[];
  selectedPlanet: Planet | null;
  onSelectPlanet: (planet: Planet) => void;
  onOverview: () => void;
}

/**
 * Quick-navigation panel listing all planets as clickable buttons.
 * Shows a color dot per planet, highlights the active one, and displays
 * the current planet name as a header label when something is selected.
 */
export const PlanetNavigation = memo(({
  planets,
  selectedPlanet,
  onSelectPlanet,
  onOverview,
}: PlanetNavigationProps) => {
  return (
    <nav className="planet-nav" aria-label="Planet navigation">
      {/* Current planet label */}
      <div className="planet-nav__current">
        {selectedPlanet ? (
          <>
            <span
              className="planet-nav__current-dot"
              style={{ background: selectedPlanet.baseColor }}
            />
            <span className="planet-nav__current-name">
              {selectedPlanet.name}
            </span>
          </>
        ) : (
          <span className="planet-nav__current-name planet-nav__current-name--dim">
            Solar System
          </span>
        )}
      </div>

      <button
        className={`planet-nav__overview${!selectedPlanet ? " planet-nav__overview--active" : ""}`}
        onClick={onOverview}
        aria-label="Overview — show all planets"
        aria-pressed={!selectedPlanet}
      >
        ☀ Overview
      </button>

      <div className="planet-nav__list">
        {planets.map((planet) => {
          const isActive = selectedPlanet?.id === planet.id;
          return (
            <button
              key={planet.id}
              className={`planet-nav__btn${isActive ? " planet-nav__btn--active" : ""}`}
              onClick={() => onSelectPlanet(planet)}
              aria-pressed={isActive}
              aria-label={`Navigate to ${planet.name}`}
              style={
                isActive
                  ? ({ "--planet-color": planet.baseColor } as React.CSSProperties)
                  : undefined
              }
            >
              <span
                className={`planet-nav__dot${isActive ? " planet-nav__dot--active" : ""}`}
                style={{ background: planet.baseColor }}
              />
              <span
                className={`planet-nav__name${isActive ? " planet-nav__name--active" : ""}`}
              >
                {planet.name}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
});
