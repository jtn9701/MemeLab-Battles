import { useEffect, useState } from "react";

import ImageContainer from "./Image_Container";
import "./Image_Gallery.css";

function ImageGallery({ memeList, setSavedMemeURL }) {
  return (
    <div className="gallery-container">
      <div className="gallery-scroll">
        {memeList.length > 0 ? (
          memeList.map((meme, index) => (
            <ImageContainer
              key={index}
              imageURL={meme.url}
              setSavedMemeURL={setSavedMemeURL}
            />
          ))
        ) : (
          <p>No memes availabe</p>
        )}
      </div>
    </div>
  );
}

export default ImageGallery;
