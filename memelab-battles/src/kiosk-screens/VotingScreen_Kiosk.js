import React, { useEffect, useRef, useState } from 'react';
import socket from '../lib/socket';

export default function VotingScreen_Kiosk({ setCurrentKiosk }) {
  const [currentMemes, setCurrentMemes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [voteCount, setVoteCount] = useState(0);
  const [results, setResults] = useState(null);
  const socketRef = useRef(socket);

  useEffect(() => {
    const s = socketRef.current;
    const handleStart = (memeList) => {
      setCurrentMemes(memeList || []);
      setCurrentIndex(0);
    };
    const handleTimer = (value) => setTimeLeft(value);
    const handleVote = (payload) => {
      if (payload && payload.count !== undefined) {
        setVoteCount(payload.count);
      } else if (typeof payload === 'number') {
        setVoteCount(payload);
      }
    };
    const handleNext = () => setCurrentIndex((prev) => prev + 1);
    const handleEnd = (payload) => setResults(payload);

    s.on('votingStarted', handleStart);
    s.on('votingTimer', handleTimer);
    s.on('voteUpdate', handleVote);
    s.on('nextMeme', handleNext);
    s.on('votingEnded', handleEnd);

    return () => {
      s.off('votingStarted', handleStart);
      s.off('votingTimer', handleTimer);
      s.off('voteUpdate', handleVote);
      s.off('nextMeme', handleNext);
      s.off('votingEnded', handleEnd);
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