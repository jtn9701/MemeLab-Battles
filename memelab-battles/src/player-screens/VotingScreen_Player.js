import ImageGallery from "../Components/Image_Gallery";
import ImageContainer from "../Components/Image_Container";

function VotingScreen({ memeList, savedMemeURL, setSavedMemeURL }) {
  function submitVotedMeme() {
    if (savedMemeURL)
      return (
        <ImageContainer
          imageURL={savedMemeURL}
          setSavedMemeURL={setSavedMemeURL}
        />
      );
  }

  return (
    <div>
      <h1>Vote for a Meme</h1>
      <ImageGallery
        memeList={memeList}
        savedMemeURL={setSavedMemeURL}
        setSavedMemeURL={setSavedMemeURL}
      />
      <h2>Your Vote</h2>
      {submitVotedMeme()}
    </div>
  );
}

export default VotingScreen;
