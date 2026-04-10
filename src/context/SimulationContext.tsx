import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";

interface SimulationContextValue {
  /** Current time multiplier (0 when paused). Range: 0.1 – 10 */
  timeScale: number;
  /** Update the time multiplier. Values are clamped to ≥ 0 */
  setTimeScale: (scale: number) => void;
  /** True while the simulation is paused */
  isPaused: boolean;
  /** Pause the simulation (sets timeScale to 0 in consumers) */
  pause: () => void;
  /** Resume the simulation at the previous timeScale */
  resume: () => void;
  /** Toggle between paused and running */
  togglePause: () => void;
}

const SimulationContext = createContext<SimulationContextValue | null>(null);

export const SimulationProvider = ({ children }: { children: ReactNode }) => {
  const [timeScale, setTimeScaleRaw] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const setTimeScale = useCallback((scale: number) => {
    setTimeScaleRaw(Math.max(0, scale));
  }, []);

  const pause = useCallback(() => setIsPaused(true), []);
  const resume = useCallback(() => setIsPaused(false), []);
  const togglePause = useCallback(() => setIsPaused((p) => !p), []);

  const value = useMemo(
    () => ({
      timeScale: isPaused ? 0 : timeScale,
      setTimeScale,
      isPaused,
      pause,
      resume,
      togglePause,
    }),
    [isPaused, timeScale, setTimeScale, pause, resume, togglePause]
  );

  return (
    <SimulationContext.Provider value={value}>
      {children}
    </SimulationContext.Provider>
  );
};

export const useSimulation = (): SimulationContextValue => {
  const ctx = useContext(SimulationContext);
  if (!ctx) throw new Error("useSimulation must be used inside SimulationProvider");
  return ctx;
};
