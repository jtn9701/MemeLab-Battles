import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

const playerList = document.getElementById("playerList");
const lobbyCode = document.getElementById("lobbyCode");
const statusMessage = document.getElementById("statusMessage");

// Lobby Code display
socket.on("lobbyCode", (data) => {
    lobbyCode.textContent = data.lobbyCode;
});

// Player joined
socket.on("playerJoined", (player) => {
    addPlayerToUI(player);
});

//Player leaves
socket.on("playerLeft", (playerId) => {
    removePlayerFromUI(playerId);
});

// Game starts
socket.on("gameStarted", () => {
    statusMessage.textContent = "Game is starting!";
});

// Lobby to game transition Placeholder