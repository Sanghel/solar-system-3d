import { memo } from "react";
import "./FloatingMenuButton.css";

interface FloatingMenuButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

/**
 * Circular floating action button shown only on mobile.
 * Toggles the PlanetDrawer open/closed.
 */
export const FloatingMenuButton = memo(({ onClick, isOpen }: FloatingMenuButtonProps) => (
  <button
    className={`fab${isOpen ? " fab--open" : ""}`}
    onClick={onClick}
    aria-label={isOpen ? "Close planet menu" : "Open planet menu"}
    aria-expanded={isOpen}
  >
    <span className="fab__icon" aria-hidden="true">
      {isOpen ? "✕" : "🪐"}
    </span>
  </button>
));
