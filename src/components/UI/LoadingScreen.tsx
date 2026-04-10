import { useProgress, Html } from "@react-three/drei";
import { useEffect, useState } from "react";
import "./LoadingScreen.css";

/** Full-page loading overlay shown while scene assets load. */
export const SceneLoader = () => {
  const { progress } = useProgress();
  const [visible, setVisible] = useState(true);

  // Fade out once fully loaded
  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(() => setVisible(false), 500);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  if (!visible) return null;

  return (
    <Html fullscreen>
      <div className={`loading-screen ${progress >= 100 ? "loading-screen--fade-out" : ""}`}>
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
        <div className="loading-progress" role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100}>
          <div className="loading-progress__track">
            <div
              className="loading-progress__fill"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="loading-progress__value">{Math.round(progress)}%</span>
        </div>
      </div>
    </Html>
  );
};
