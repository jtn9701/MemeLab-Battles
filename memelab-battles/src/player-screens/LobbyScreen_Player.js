// TODO: Take player number in as a prop from the server
// Only show the button for the host (player 1)
function LobbyScreenPlayer({ setCurrentScreen }) {
  return (
    <div>
      <h1>Player 1</h1>
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
