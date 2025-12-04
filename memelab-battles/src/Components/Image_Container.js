import React from "react";
import "./Image_Container.css";

function ImageContainer({ imageURL, setSavedMemeURL }) {
  return (
    <div className="image-item">
      <div className="image-wrapper">
        <img
          className="image-item-img"
          src={imageURL}
          alt="Clickable Image"
          onError={() => {
            console.log("Image failed to load: ", imageURL);
          }}
          onClick={() => {
            setSavedMemeURL(imageURL);
          }}
        />
      </div>
    </div>
  );
}

export default ImageContainer;
