import React, { useState } from "react";

import ImageGallery from "../Components/Image_Gallery";
import ImageContainer from "../Components/Image_Container";

function CreateMemeScreen({ setCurrentScreen }) {
  const [inputText, setInputText] = useState("");
  const [createdMemeImage, setCreatedMemeImage] = useState("");

  function submitCreatedMeme() {
    if (inputText && createdMemeImage)
      return <ImageContainer memeCaption={inputText} />;
  }

  return (
    <div>
      <h1>Create Meme</h1>
      <ImageGallery setCreatedMemeImage={setCreatedMemeImage} />
      <input
        type="text"
        value={inputText}
        onChange={(event) => {
          setInputText(event.target.value);
        }}
        placeholder="Type a caption..."
      />
      <button>Submit Meme</button>
      {submitCreatedMeme()}
    </div>
  );
}

export default CreateMemeScreen;
