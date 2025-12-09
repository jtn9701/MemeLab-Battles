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
        {memeURL && <img src={memeURL} alt="meme" style={styles.memeImage} />}
      </div>
      <div id="timerDisplay" style={styles.timer}>Time left: {timeLeft}s</div>
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
    height: '400px',
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
};