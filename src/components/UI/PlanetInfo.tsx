import type { Planet } from '../../types/planet';
import './PlanetInfo.css';

interface PlanetInfoProps {
  /** Planet data to display, or null if no planet selected */
  planet: Planet | null;
  /** Callback function when close button is clicked */
  onClose: () => void;
}

const TYPE_LABELS: Record<Planet['type'], string> = {
  terrestrial: 'Terrestrial',
  'gas-giant': 'Gas Giant',
  'ice-giant': 'Ice Giant',
  dwarf: 'Dwarf Planet',
  star: 'Star',
};

const TYPE_ICONS: Record<Planet['type'], string> = {
  terrestrial: '🌍',
  'gas-giant': '🪐',
  'ice-giant': '🔵',
  dwarf: '⚫',
  star: '⭐',
};

/**
 * PlanetInfo Component
 * Displays detailed information about a selected planet in a slide-out panel.
 */
export const PlanetInfo = ({ planet, onClose }: PlanetInfoProps) => {
  if (!planet) return null;

  const typeLabel = TYPE_LABELS[planet.type] ?? planet.type;
  const typeIcon = TYPE_ICONS[planet.type] ?? '🌑';
  const distanceMkm = (planet.distanceFromSun / 1e6).toFixed(1);

  return (
    <div className="planet-info-panel" role="complementary" aria-label={`Info: ${planet.name}`}>
      {/* Header */}
      <div className="planet-info-header" style={{ borderColor: planet.baseColor }}>
        <div className="planet-info-header__icon" aria-hidden="true">
          <img
            src={planet.texture}
            alt={planet.name}
            className="planet-info-header__img"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = 'none';
              (e.currentTarget.nextElementSibling as HTMLElement | null)?.removeAttribute('hidden');
            }}
          />
          <span hidden>{typeIcon}</span>
        </div>
        <div className="planet-info-header__text">
          <h2 className="planet-name" style={{ color: planet.baseColor, textShadow: `0 0 12px ${planet.baseColor}80` }}>
            {planet.name}
          </h2>
          <span className="planet-type-badge">{typeLabel}</span>
        </div>
        <button className="close-button" onClick={onClose} aria-label="Close planet info">
          ✕
        </button>
      </div>

      <div className="planet-info-content">
        {/* Stats grid */}
        <section className="info-section">
          <h3 className="info-section__title">Physical Data</h3>
          <div className="info-grid">
            <div className="info-item">
              <label>Diameter</label>
              <p>{planet.diameter.toLocaleString()} km</p>
            </div>
            <div className="info-item">
              <label>Temperature</label>
              <p>{planet.temperature} K</p>
            </div>
            <div className="info-item">
              <label>Distance from Sun</label>
              <p>{distanceMkm} M km</p>
            </div>
            <div className="info-item">
              <label>Satellites</label>
              <p>{planet.numberOfSatellites}</p>
            </div>
          </div>
        </section>

        {/* Motion data */}
        <section className="info-section">
          <h3 className="info-section__title">Motion</h3>
          <div className="info-grid">
            <div className="info-item">
              <label>Rotation Speed</label>
              <p>{planet.rotationSpeed.toFixed(4)} rad/s</p>
            </div>
            <div className="info-item">
              <label>Orbit Speed</label>
              <p>{planet.orbitSpeed.toFixed(4)}</p>
            </div>
          </div>
        </section>

        {/* Fun fact */}
        <div className="fun-fact">
          <h3>Did you know?</h3>
          <p>{planet.funFact}</p>
        </div>
      </div>
    </div>
  );
};
