function LobbyScreenPlayer({ setCurrentScreen }) {
  return (
    <div>
      <h1>Wait for Players/Start Game</h1>
      <button
        onClick={() => {
          setCurrentScreen(1);
        }}
      >
        Start Game
      </button>
    </div>
  );
}

export default LobbyScreenPlayer;
