import './Attribution.css';

const ThreeJsIcon = () => (
  <svg
    className="attribution__logo"
    viewBox="0 0 36 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Three.js"
    role="img"
  >
    {/* Outer triangle */}
    <path
      d="M18 1.5 L34.5 30.5 L1.5 30.5 Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    {/* Inner top triangle */}
    <path
      d="M18 9 L26.25 23.5 L9.75 23.5 Z"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinejoin="round"
      strokeOpacity="0.55"
    />
    {/* Vertical midline */}
    <line x1="18" y1="1.5" x2="18" y2="30.5" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
    {/* Horizontal midline */}
    <line x1="9.75" y1="16.5" x2="26.25" y2="16.5" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
  </svg>
);

export function Attribution() {
  return (
    <div className="attribution" aria-label="Créditos">
      <p className="attribution__text">
        Crafted with{' '}
        <span className="attribution__heart" aria-label="amor">♥</span>
        {' '}and{' '}
        <span className="attribution__logo-wrap" title="Three.js">
          <ThreeJsIcon />
        </span>
        {' '}by{' '}
        <span className="attribution__author">Sanghel González</span>
      </p>
    </div>
  );
}
