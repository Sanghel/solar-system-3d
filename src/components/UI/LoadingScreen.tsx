import { useProgress } from "@react-three/drei";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import "./LoadingScreen.css";

/**
 * Full-page loading overlay rendered as a real DOM element (via React portal)
 * rather than inside the R3F Canvas. This means Lighthouse detects it as an
 * immediate First Contentful Paint instead of waiting for WebGL to initialise.
 *
 * useProgress from drei uses a module-level Zustand store backed by
 * THREE.DefaultLoadingManager, so it works correctly outside the Canvas.
 */
export const LoadingOverlay = () => {
  const { progress } = useProgress();
  const [visible, setVisible] = useState(true);

  // Hide the pre-React loader (static HTML in index.html) as soon as
  // this component mounts — React's overlay takes over from here.
  useEffect(() => {
    const preLoader = document.getElementById("pre-loader");
    if (preLoader) preLoader.style.display = "none";
  }, []);

  // Fade out once fully loaded
  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(() => setVisible(false), 500);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  if (!visible) return null;

  return createPortal(
    <div className={`loading-screen${progress >= 100 ? " loading-screen--fade-out" : ""}`}>
      {/* Animated rings */}
      <div className="loading-rings" aria-hidden="true">
        <div className="loading-ring loading-ring--1" />
        <div className="loading-ring loading-ring--2" />
        <div className="loading-ring loading-ring--3" />
        <div className="loading-sun" />
      </div>

      {/* Text */}
      <div className="loading-text">
        <p className="loading-title">Solar System</p>
        <p className="loading-subtitle">Initializing simulation…</p>
      </div>

      {/* Progress bar */}
      <div
        className="loading-progress"
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className="loading-progress__track">
          <div
            className="loading-progress__fill"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="loading-progress__value">{Math.round(progress)}%</span>
      </div>
    </div>,
    document.body
  );
};
