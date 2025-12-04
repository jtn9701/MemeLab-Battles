import React, { useState, useEffect } from "react";

import ImageGallery from "../Components/Image_Gallery";
import ImageContainer from "../Components/Image_Container";

import { get_imgflip_meme } from "../APIs/ImgflipAPI";

function CreateMemeScreen({ savedMemeURL, setSavedMemeURL }) {
  const [memeList, setMemeList] = useState([]);

  function submitCreatedMeme() {
    if (savedMemeURL)
      return (
        <ImageContainer
          imageURL={savedMemeURL}
          setSavedMemeURL={setSavedMemeURL}
        />
      );
  }

  useEffect(() => {
    async function findMemes() {
      const memes = await get_imgflip_meme();
      setMemeList(memes);
    }

    findMemes();
  }, []);

  return (
    <div>
      <h1>Choose The Best Meme Template</h1>
      {memeList.length > 0 ? (
        <>
          <ImageGallery memeList={memeList} setSavedMemeURL={setSavedMemeURL} />
          <h3>Click a meme and Submit</h3>
          <button>Submit Meme</button>
          {submitCreatedMeme()}
        </>
      ) : (
        <p>Loading memes...</p>
      )}
    </div>
  );
}

export default CreateMemeScreen;
