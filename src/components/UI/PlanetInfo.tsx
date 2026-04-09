import type { Planet } from '../../types/planet';
import './PlanetInfo.css';

interface PlanetInfoProps {
  /** Planet data to display, or null if no planet selected */
  planet: Planet | null;
  /** Callback function when close button is clicked */
  onClose: () => void;
}

/**
 * PlanetInfo Component
 * Displays detailed information about a selected planet in a slide-out panel
 * Shows planet properties, fun facts, and a close button
 */
export const PlanetInfo = ({ planet, onClose }: PlanetInfoProps) => {
  if (!planet) return null;

  return (
    <div className="planet-info-panel">
      <button className="close-button" onClick={onClose} aria-label="Close">
        ✕
      </button>

      <div className="planet-info-content">
        <h2 className="planet-name">{planet.name}</h2>

        <div className="info-grid">
          <div className="info-item">
            <label>Type</label>
            <p>{planet.type}</p>
          </div>

          <div className="info-item">
            <label>Diameter</label>
            <p>{planet.diameter.toLocaleString()} km</p>
          </div>

          <div className="info-item">
            <label>Distance from Sun</label>
            <p>{(planet.distanceFromSun / 1e6).toFixed(1)} M km</p>
          </div>

          <div className="info-item">
            <label>Temperature</label>
            <p>{planet.temperature} K</p>
          </div>

          <div className="info-item">
            <label>Satellites</label>
            <p>{planet.numberOfSatellites}</p>
          </div>

          <div className="info-item">
            <label>Rotation Speed</label>
            <p>{planet.rotationSpeed.toFixed(4)}</p>
          </div>

          <div className="info-item">
            <label>Orbit Speed</label>
            <p>{planet.orbitSpeed.toFixed(4)}</p>
          </div>
        </div>

        <div className="fun-fact">
          <h3>Did you know?</h3>
          <p>{planet.funFact}</p>
        </div>
      </div>
    </div>
  );
};
