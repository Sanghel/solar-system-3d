import { memo } from "react";
import type { Planet } from "../../types/planet";
import "./PlanetDrawer.css";

interface PlanetDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPlanet: (planet: Planet) => void;
  planets: Planet[];
  selectedPlanet: Planet | null;
}

/**
 * Slide-up drawer shown on mobile with the full planet list.
 * Selecting a planet closes the drawer and moves the camera.
 */
export const PlanetDrawer = memo(
  ({ isOpen, onClose, onSelectPlanet, planets, selectedPlanet }: PlanetDrawerProps) => {
    if (!isOpen) return null;

    const handleSelect = (planet: Planet) => {
      onSelectPlanet(planet);
      onClose();
    };

    return (
      <>
        {/* Backdrop */}
        <div className="drawer-backdrop" onClick={onClose} aria-hidden="true" />

        {/* Drawer panel */}
        <div
          className="planet-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Planet navigation"
        >
          <div className="drawer-handle" />

          <h2 className="drawer-title">Solar System</h2>

          <ul className="drawer-list" role="list">
            {planets.map((planet) => {
              const isSelected = selectedPlanet?.id === planet.id;
              return (
                <li key={planet.id}>
                  <button
                    className={`drawer-item${isSelected ? " drawer-item--active" : ""}`}
                    onClick={() => handleSelect(planet)}
                    style={isSelected ? { borderColor: planet.baseColor } : undefined}
                  >
                    <span
                      className="drawer-item__dot"
                      style={{ background: planet.baseColor }}
                    />
                    <span className="drawer-item__name">{planet.name}</span>
                    {isSelected && (
                      <span className="drawer-item__active-indicator" aria-hidden="true">◀</span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </>
    );
  }
);
