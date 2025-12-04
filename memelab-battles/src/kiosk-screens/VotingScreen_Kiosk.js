import { io } from "socket.io-client";
const socket = io("http://localhost:3000");

const memeImage = document.getElementById("memeImage");
const caption = document.getElementById("caption");
const timer = document.getElementById("timer");
const votes = document.getElementById("voteCount");

// Voting begins
socket.on("votingStarted", (memeList) => {
    currentMemes = memeList;
    currentIndex = 0;
    displayMeme(currentMemes[currentIndex]);
});

// Voting timer tick tock
socket.on("votingTimer", (timeLeft) => {
    timer.textContent = `Time left: ${timeLeft}s`;
});

// When players vote
socket.on("voteUpdate", (voteCount) => {
    votes.textContent = `Votes: ${voteCount}`;
});

// Move from one meme to another
socket.on("nextMeme", () => {
    currentIndex++;
    displayMeme(currentMemes[currentIndex]);
});

// Voting ends
socket.on("votingEnded", (results) => {
    showResults(results);
});