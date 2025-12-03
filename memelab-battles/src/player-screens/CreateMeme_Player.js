import React, { useState } from "react";

import ImageGallery from "../Components/Image_Gallery";

function CreateMemeScreen() {
  const [inputText, setInputText] = useState("");

  return (
    <div>
      <h1>Create Meme</h1>
      <ImageGallery />
      <input
        type="text"
        value={inputText}
        onChange={(event) => {
          setInputText(event.target.value);
        }}
        placeholder="Type a caption..."
      />
    </div>
  );
}

export default CreateMemeScreen;
