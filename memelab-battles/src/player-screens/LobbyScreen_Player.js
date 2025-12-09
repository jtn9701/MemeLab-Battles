function LobbyScreenPlayer({
  socket,
  setCurrentScreen,
  username,
  setUsername,
  setMemeWithText,
}) {
  const handleNameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleStartGame = () => {
    // If name is empty or only spaces, set to "Anonymous"
    const trimmedName = username.trim();
    const finalName = trimmedName === "" ? "Anonymous" : trimmedName;
    setUsername(finalName);

    // Initialize meme metadata with username
    setMemeWithText({
      username: finalName,
      url: "",
      textBoxes: [],
    });

    console.log("Player name:", finalName);
    socket.emit("joinLobby", { username: finalName });
    socket.emit("startCreation", {});
    setCurrentScreen(1);
  };

  // Check if name is valid (not empty after trimming)
  const hasValidName = username.trim().length > 0;

  return (
    <div>
      <h1>Wait for Players/Start Game</h1>
      <div>
        <label htmlFor="player-name">Enter your name: </label>
        <input
          id="player-name"
          type="text"
          value={username}
          onChange={handleNameChange}
          placeholder="Your name"
        />
      </div>
      {hasValidName && <button onClick={handleStartGame}>Start Game</button>}
    </div>
  );
}

export default LobbyScreenPlayer;
