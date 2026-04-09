import { useProgress, Html } from "@react-three/drei";

/** In-canvas loading indicator shown via Html portal while textures load. */
export const SceneLoader = () => {
  const { progress } = useProgress();
  return (
    <Html center>
      <div
        style={{
          color: "#ffffff",
          fontFamily: "monospace",
          fontSize: "14px",
          textAlign: "center",
          background: "rgba(0,0,0,0.7)",
          padding: "12px 20px",
          borderRadius: "8px",
          border: "1px solid rgba(255,255,255,0.15)",
          whiteSpace: "nowrap",
        }}
      >
        Loading Solar System…
        <br />
        <span style={{ color: "#FDB813" }}>{Math.round(progress)}%</span>
      </div>
    </Html>
  );
};
