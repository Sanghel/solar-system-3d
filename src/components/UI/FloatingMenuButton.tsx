import { memo } from "react";
import "./FloatingMenuButton.css";

interface FloatingMenuButtonProps {
  onClick: () => void;
  /** Whether the controlled element (drawer or panel) is currently open/visible */
  isOpen: boolean;
  /** When true the FAB controls the info panel; when false it controls the drawer */
  hasPlanetSelected: boolean;
}

function getIcon(hasPlanetSelected: boolean, isOpen: boolean): string {
  if (hasPlanetSelected) {
    // Panel mode: chevron signals collapse/expand
    return isOpen ? "▾" : "▴";
  }
  // Drawer mode
  return isOpen ? "✕" : "🪐";
}

function getLabel(hasPlanetSelected: boolean, isOpen: boolean): string {
  if (hasPlanetSelected) {
    return isOpen ? "Hide planet info" : "Show planet info";
  }
  return isOpen ? "Close planet menu" : "Open planet menu";
}

/**
 * Circular floating action button shown only on mobile.
 *
 * Two modes:
 * - Drawer mode (no planet selected): opens/closes the PlanetDrawer.
 * - Panel mode (planet selected): shows/hides the PlanetInfo panel without
 *   deselecting the planet, so the 3D view stays unobstructed.
 */
export const FloatingMenuButton = memo(
  ({ onClick, isOpen, hasPlanetSelected }: FloatingMenuButtonProps) => (
    <button
      className={`fab${isOpen ? " fab--open" : ""}${hasPlanetSelected ? " fab--panel-mode" : ""}`}
      onClick={onClick}
      aria-label={getLabel(hasPlanetSelected, isOpen)}
      aria-expanded={isOpen}
    >
      <span className="fab__icon" aria-hidden="true">
        {getIcon(hasPlanetSelected, isOpen)}
      </span>
    </button>
  )
);
