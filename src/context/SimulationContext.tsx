import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface SimulationContextValue {
  timeScale: number;
  setTimeScale: (scale: number) => void;
  isPaused: boolean;
  pause: () => void;
  resume: () => void;
  togglePause: () => void;
}

const SimulationContext = createContext<SimulationContextValue | null>(null);

export const SimulationProvider = ({ children }: { children: ReactNode }) => {
  const [timeScale, setTimeScaleRaw] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const setTimeScale = (scale: number) => {
    setTimeScaleRaw(Math.max(0, scale));
  };

  const pause = () => setIsPaused(true);
  const resume = () => setIsPaused(false);
  const togglePause = () => setIsPaused((p) => !p);

  return (
    <SimulationContext.Provider
      value={{
        timeScale: isPaused ? 0 : timeScale,
        setTimeScale,
        isPaused,
        pause,
        resume,
        togglePause,
      }}
    >
      {children}
    </SimulationContext.Provider>
  );
};

export const useSimulation = (): SimulationContextValue => {
  const ctx = useContext(SimulationContext);
  if (!ctx) throw new Error("useSimulation must be used inside SimulationProvider");
  return ctx;
};
