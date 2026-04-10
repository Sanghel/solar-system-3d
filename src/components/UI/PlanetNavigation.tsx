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
 * Each button shows a color dot matching the planet's base color.
 */
export const PlanetNavigation = ({
  planets,
  selectedPlanet,
  onSelectPlanet,
  onOverview,
}: PlanetNavigationProps) => {
  return (
    <nav className="planet-nav" aria-label="Planet navigation">
      <button
        className="planet-nav__overview"
        onClick={onOverview}
        aria-label="Overview — show all planets"
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
            >
              <span
                className="planet-nav__dot"
                style={{ background: planet.baseColor }}
              />
              <span className="planet-nav__name">{planet.name}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
