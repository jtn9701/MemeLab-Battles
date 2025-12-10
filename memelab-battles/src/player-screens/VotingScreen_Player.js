import MemeGallery from "../Components/Meme_Gallery";
import MemeContainer from "../Components/Meme_Container";

function VotingScreen({ memeList, savedWithText, setMemeWithText, setCurrentScreen }) {
  function submitVotedMeme() {
    if (savedWithText.url && savedWithText.textBoxes)
      return <MemeContainer meme={savedWithText} />;
  }

  const handleMemeClick = (meme) => {
    setMemeWithText(meme);
  };

  return (
    <div>
      <h1>Vote for a Meme</h1>
      <MemeGallery memeList={memeList} onClick={handleMemeClick} />
      <h2>Your Vote</h2>
      {submitVotedMeme()}
      <div style={{ marginTop: "20px" }}>
        <button onClick={() => setCurrentScreen(0)}>Back to Lobby</button>
      </div>
    </div>
  );
}

export default VotingScreen;
