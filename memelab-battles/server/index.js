const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const gameState = {
  players: [],
  memes: [],
  votes: {},
};

io.on("connection", (socket) => {
  socket.on("joinLobby", ({ username }) => {
    if (!username) return;
    const trimmed = username.trim();
    if (!trimmed) return;
    gameState.players = [...new Set([...gameState.players, trimmed])];
    socket.data.username = trimmed;
    io.emit("playersUpdated", gameState.players);
  });

  socket.on("startCreation", ({ prompt, duration } = {}) => {
    const payload = {
      prompt: prompt || "",
      duration: duration || 60,
    };
    io.emit("memeCreationStarted", payload);
  });

  socket.on("memeCreated", (meme) => {
    if (!meme || !meme.url) return;
    gameState.memes.push(meme);
    io.emit("memeSaved", meme.url);
    io.emit("memeListUpdated", gameState.memes);
  });

  socket.on("startVoting", ({ duration } = {}) => {
    io.emit("votingStarted", gameState.memes);
    if (duration) io.emit("votingTimer", duration);
  });

  socket.on("voteCast", (meme) => {
    if (!meme || !meme.url) return;
    const key = meme.url;
    gameState.votes[key] = (gameState.votes[key] || 0) + 1;
    io.emit("voteUpdate", { url: key, count: gameState.votes[key] });
  });

  socket.on("endVoting", () => {
    io.emit("votingEnded", gameState.votes);
    gameState.memes = [];
    gameState.votes = {};
  });

  socket.on("resetGame", () => {
    gameState.players = [];
    gameState.memes = [];
    gameState.votes = {};
    io.emit("gameReset");
  });

  socket.on("disconnect", () => {
    const username = socket.data.username;
    if (username) {
      gameState.players = gameState.players.filter((p) => p !== username);
      io.emit("playersUpdated", gameState.players);
    }
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Socket server running on http://localhost:${PORT}`);
});
