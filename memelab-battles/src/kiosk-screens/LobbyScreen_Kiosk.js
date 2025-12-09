import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import QRCode from "qrcode";
const socket = io("http://localhost:3000");

export default function LobbyScreenKiosk({ lobbyName, players, setCurrentKiosk }) {
  const qrCanvasRef = useRef(null);

  useEffect(() => {
    // Generate QR code with room/lobby URL
    const generateQRCode = async () => {
      if (qrCanvasRef.current) {
        try {
          // Create a URL that players can use to join
          const joinUrl = `${window.location.origin}/controller?room=${lobbyName}`;
          await QRCode.toCanvas(qrCanvasRef.current, joinUrl, {
            width: 250,
            margin: 1,
            color: {
              dark: '#000',
              light: '#fff'
            }
          });
        } catch (err) {
          console.error('Failed to generate QR code:', err);
        }
      }
    };

    generateQRCode();

    socket.on("gameStarted", () => {
      if (setCurrentKiosk) setCurrentKiosk(1);
    });
    return () => {
      socket.off("gameStarted");
    };
  }, [lobbyName, setCurrentKiosk]);

  return (
    <div style={styles.container}>
      
      
      <div style={styles.playersPanel}>
        <h2 style={styles.sectionTitle}>Players</h2>
        <div style={styles.playerList}>
          {players && players.length > 0 ? (
            players.map((p, index) => (
              <div key={index} style={styles.playerItem}>{p}</div>
            ))
          ) : (
            <div style={styles.placeholderText}>Waiting for players...</div>
          )}
        </div>
      </div>

      
      <div style={styles.centerPanel}>
        <h1 style={styles.lobbyTitle}>{lobbyName}</h1>
        <div style={styles.subText}>MEME-LAB BATTLES</div>
      </div>

      
      <div style={styles.qrPanel}>
        <h2 style={styles.sectionTitle}>Join Game</h2>
        <canvas ref={qrCanvasRef} style={styles.qrCanvas}></canvas>
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

  qrCanvas: {
    marginTop: "20px",
    border: "3px solid #fff",
    borderRadius: "10px",
    backgroundColor: "#fff",
    padding: "10px",
  }
};