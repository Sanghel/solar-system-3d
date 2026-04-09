import { useSimulation } from "../../context/SimulationContext";
import "./TimeControl.css";

const SPEED_STEPS = [0.1, 0.25, 0.5, 1, 2, 5, 10];

export const TimeControl = () => {
  const { timeScale, setTimeScale, isPaused, togglePause } = useSimulation();

  return (
    <div className="time-control">
      <button
        className="time-control__play-pause"
        onClick={togglePause}
        aria-label={isPaused ? "Resume simulation" : "Pause simulation"}
        title={isPaused ? "Resume" : "Pause"}
      >
        {isPaused ? "▶" : "⏸"}
      </button>

      <div className="time-control__speed">
        <span className="time-control__label">Speed</span>
        <input
          className="time-control__slider"
          type="range"
          min={0}
          max={SPEED_STEPS.length - 1}
          step={1}
          value={SPEED_STEPS.indexOf(timeScale) !== -1 ? SPEED_STEPS.indexOf(timeScale) : 3}
          onChange={(e) => setTimeScale(SPEED_STEPS[Number(e.target.value)])}
          aria-label="Simulation speed"
          disabled={isPaused}
        />
        <span className="time-control__value">{timeScale}×</span>
      </div>
    </div>
  );
};
