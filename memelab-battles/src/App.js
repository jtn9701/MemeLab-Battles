import { useState } from "react";
import "./App.css";
import PlayerScreen from "./server/PlayerScreen";
import KioskScreen from "./server/KioskScreen";

function App() {
  const [view, setView] = useState("player"); // "player" or "kiosk"

  return (
    <div className="App">
      {/* Dev toggle for switching views */}
      <div style={styles.devToggle}>
        <button
          onClick={() => setView("player")}
          style={{
            ...styles.button,
            backgroundColor: view === "player" ? "#06b6d4" : "#333",
          }}
        >
          Player View
        </button>
        <button
          onClick={() => setView("kiosk")}
          style={{
            ...styles.button,
            backgroundColor: view === "kiosk" ? "#06b6d4" : "#333",
          }}
        >
          Kiosk View
        </button>
      </div>

      {/* Render selected view */}
      {view === "player" ? <PlayerScreen /> : <KioskScreen />}
    </div>
  );
}

const styles = {
  devToggle: {
    position: "fixed",
    top: "10px",
    right: "10px",
    zIndex: 9999,
    display: "flex",
    gap: "10px",
  },
  button: {
    padding: "8px 12px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    color: "#fff",
    fontSize: "12px",
    fontWeight: "bold",
  },
};

export default App;
