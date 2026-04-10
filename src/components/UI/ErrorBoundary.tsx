import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[ErrorBoundary] Uncaught error:", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            position: "fixed",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "#080e1e",
            color: "#ffffff",
            fontFamily: "system-ui, sans-serif",
            gap: "16px",
            padding: "24px",
            textAlign: "center",
          }}
        >
          <span style={{ fontSize: "48px" }}>☀️</span>
          <h1 style={{ fontSize: "22px", fontWeight: 700, margin: 0 }}>
            Something went wrong
          </h1>
          <p style={{ color: "rgba(255,255,255,0.6)", maxWidth: "400px", lineHeight: 1.6, margin: 0 }}>
            The solar system simulation encountered an unexpected error.
            Try refreshing the page.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: "8px",
              padding: "10px 24px",
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "8px",
              color: "#ffffff",
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            Reload
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
