import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a1926",
          color: "#ffffff",
          fontFamily: "'Poppins', sans-serif",
          padding: "2rem",
          textAlign: "center"
        }}>
          <div style={{
            maxWidth: "500px",
            background: "#0f2538",
            padding: "2.5rem",
            borderRadius: "18px",
            border: "1px solid rgba(245, 158, 11, 0.3)",
            boxShadow: "0 20px 40px rgba(0,0,0,0.5)"
          }}>
            <h1 style={{ color: "#f59e0b", fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", marginBottom: "0.8rem" }}>
              Hubbali Travel World
            </h1>
            <p style={{ color: "#cbd5e1", fontSize: "0.95rem", lineHeight: "1.6", marginBottom: "1.5rem" }}>
              Something unexpected happened while loading the page. Please refresh or connect with our support team.
            </p>
            <div style={{ display: "flex", gap: "0.8rem", justifyContent: "center", flexWrap: "wrap" }}>
              <button
                onClick={() => window.location.reload()}
                style={{
                  background: "linear-gradient(135deg, #f59e0b, #d97706)",
                  color: "#0a1926",
                  border: "none",
                  padding: "0.8rem 1.5rem",
                  borderRadius: "999px",
                  fontWeight: "700",
                  cursor: "pointer"
                }}
              >
                🔄 Refresh Page
              </button>
              <a
                href="https://wa.me/916360612345"
                style={{
                  background: "#25d366",
                  color: "#ffffff",
                  textDecoration: "none",
                  padding: "0.8rem 1.5rem",
                  borderRadius: "999px",
                  fontWeight: "700",
                  display: "inline-block"
                }}
              >
                💬 WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

