import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

export default function CreatingMemeScreen_Kiosk({ setCurrentKiosk }) {
  const [prompt, setPrompt] = useState('Waiting for prompt...');
  const [timeLeft, setTimeLeft] = useState(0);
  const [memeURL, setMemeURL] = useState('');
  const socketRef = useRef(null);

  useEffect(() => {
    const socket = io('http://localhost:3000');
    socketRef.current = socket;

    socket.on('memeCreationStarted', (data) => {
      setPrompt(data.prompt || 'Create a meme');
      setTimeLeft(data.duration || 60);
    });

    socket.on('memeCreationTimer', (timeLeft) => {
      setTimeLeft(timeLeft);
    });

    socket.on('memeSaved', (memeURL) => {
      setMemeURL(memeURL);
    });

    return () => {
      if (socket) socket.disconnect();
    };
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.promptText}>{prompt}</h2>
      <div id="memeCanvas" style={styles.canvas}>
        <img
          src={memeURL ? memeURL : "/memeplace.png"}
          alt="meme"
          style={styles.memeImage}
        />
      </div>
      <div id="timerDisplay" style={styles.timer}>Time left: {timeLeft}s</div>
      <button 
        onClick={() => setCurrentKiosk(2)} 
        style={styles.navButton}
        onMouseEnter={(e) => e.target.style.backgroundColor = "#035a73ec"}
        onMouseLeave={(e) => e.target.style.backgroundColor = "#027395ec"}
      >
        Go to Voting
      </button>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#121212',
    color: '#fff',
    padding: '20px',
  },
  promptText: {
    fontSize: '32px',
    marginBottom: '20px',
  },
  canvas: {
    width: '600px',
    height: '300px',
    border: '2px solid #fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  memeImage: {
    maxWidth: '100%',
    maxHeight: '100%',
  },
  timer: {
    fontSize: '24px',
    opacity: 0.7,
  },
  navButton: {
    marginTop: '20px',
    padding: '15px 40px',
    fontSize: '18px',
    fontWeight: 'bold',
    backgroundColor: '#027395ec',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};