import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

export default function VotingScreen_Kiosk({ setCurrentKiosk }) {
  const [currentMemes, setCurrentMemes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [voteCount, setVoteCount] = useState(0);
  const [results, setResults] = useState(null);
  const socketRef = useRef(null);

  useEffect(() => {
    const socket = io('http://localhost:3000');
    socketRef.current = socket;

    socket.on('votingStarted', (memeList) => {
      setCurrentMemes(memeList || []);
      setCurrentIndex(0);
    });

    socket.on('votingTimer', (timeLeft) => {
      setTimeLeft(timeLeft);
    });

    socket.on('voteUpdate', (voteCount) => {
      setVoteCount(voteCount);
    });

    socket.on('nextMeme', () => {
      setCurrentIndex((prev) => prev + 1);
    });

    socket.on('votingEnded', (results) => {
      setResults(results);
    });

    return () => {
      if (socket) socket.disconnect();
    };
  }, []);

  const currentMeme = currentMemes[currentIndex] || {};

  if (results) {
    return (
      <div style={styles.container}>
        <h2>Voting Complete!</h2>
        <div id="results">Results: {JSON.stringify(results)}</div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div id="memeImage" style={styles.memeDisplay}>
        {currentMeme.image && <img src={currentMeme.image} alt="meme" style={styles.image} />}
      </div>
      <div id="caption" style={styles.caption}>{currentMeme.caption || 'Meme'}</div>
      <div id="timer" style={styles.timer}>Time left: {timeLeft}s</div>
      <div id="voteCount" style={styles.voteCount}>Votes: {voteCount}</div>
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
  memeDisplay: {
    width: '600px',
    height: '400px',
    backgroundColor: '#222',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px',
    borderRadius: '8px',
  },
  image: {
    maxWidth: '100%',
    maxHeight: '100%',
  },
  caption: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  timer: {
    fontSize: '20px',
    opacity: 0.7,
    marginBottom: '10px',
  },
  voteCount: {
    fontSize: '20px',
    color: '#06b6d4',
  },
};