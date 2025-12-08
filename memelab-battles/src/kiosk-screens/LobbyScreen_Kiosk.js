import { io } from "socket.io-client";
const socket = io("http://localhost:3000");

export default function LobbyScreenKiosk({ lobbyName, players }) {
  return (
    <div style={styles.container}>
      
      
      <div style={styles.playersPanel}>
        <h2 style={styles.sectionTitle}>Players</h2>
        <ul style={styles.playerList}>
          {players && players.length > 0 ? (
            players.map((p, index) => (
              <li key={index} style={styles.playerItem}>{p}</li>
            ))
          ) : (
            <p style={styles.placeholderText}>Waiting for players...</p>
          )}
        </ul>
      </div>

      
      <div style={styles.centerPanel}>
        <h1 style={styles.lobbyTitle}>{lobbyName}</h1>
        <p style={styles.subText}>MEME-LAB BATTLES</p>
      </div>

      
      <div style={styles.qrPanel}>
        <h2 style={styles.sectionTitle}>Join Game</h2>
        <div style={styles.qrPlaceholder}>
          <p>QR Code</p>
          <p style={{ fontSize: "12px", opacity: 0.6 }}>(placeholder)</p>
        </div>
      </div>
    </div>
  );
}

// Styling
const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    height: "100vh",
    width: "100vw",
    backgroundColor: "#121212",
    color: "#fff",
    padding: "20px",
    boxSizing: "border-box",
    fontFamily: "Arial, sans-serif"
  },

  playersPanel: {
    width: "25%",
    padding: "20px",
    borderRight: "2px solid #333",
  },

  sectionTitle: {
    marginBottom: "10px",
    fontSize: "24px",
  },

  playerList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },

  playerItem: {
    padding: "10px 0",
    borderBottom: "1px solid #333",
    fontSize: "18px",
  },

  placeholderText: {
    opacity: 0.6,
    fontStyle: "italic",
  },

  centerPanel: {
    width: "50%",
    textAlign: "center",
    padding: "20px",
  },

  lobbyTitle: {
    fontSize: "48px",
    marginBottom: "20px",
    color: "#027395ec",
    fontWeight: "bold",
  },

  subText: {
    fontSize: "48px",
    marginBottom: "20px",
    color: "#ff0505ec",
    fontWeight: "bold",
  },

  qrPanel: {
    width: "25%",
    padding: "20px",
    borderLeft: "2px solid #333",
    textAlign: "center",
  },

  qrPlaceholder: {
    marginTop: "20px",
    height: "250px",
    width: "250px",
    border: "3px solid #fff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "10px",
    opacity: 0.5,
  }
};