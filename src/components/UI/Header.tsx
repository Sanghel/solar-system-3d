import './Header.css';

/**
 * Header Component
 * Fixed top bar with application title and minimal branding.
 */
export const Header = () => (
  <header className="app-header" role="banner">
    <div className="app-header__inner">
      <div className="app-header__brand">
        <span className="app-header__icon" aria-hidden="true">☀️</span>
        <span className="app-header__title">Solar System</span>
      </div>
      <span className="app-header__tagline">Interactive 3D Simulation</span>
    </div>
  </header>
);
