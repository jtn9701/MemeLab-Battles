import MemeGallery from "../Components/Meme_Gallery";
import MemeContainer from "../Components/Meme_Container";
import socket from "../lib/socket";

function VotingScreen({ memeList, savedWithText, setMemeWithText, socket: injectedSocket }) {
  function submitVotedMeme() {
    if (savedWithText.url && savedWithText.textBoxes)
      return <MemeContainer meme={savedWithText} />;
  }

  const handleMemeClick = (meme) => {
    setMemeWithText(meme);
    (injectedSocket || socket).emit("voteCast", meme);
  };

  return (
    <div>
      <h1>Vote for a Meme</h1>
      <MemeGallery memeList={memeList} onClick={handleMemeClick} />
      <h2>Your Vote</h2>
      {submitVotedMeme()}
    </div>
  );
}

export default VotingScreen;
