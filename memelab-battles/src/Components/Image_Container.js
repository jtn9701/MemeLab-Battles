import React, { useEffect, useState } from "react";

function ImageContainer({ memeCaption, setCreatedMemeImage }) {
  const [image, setImage] = useState("");

  useEffect(() => {
    let newImage =
      "https://picsum.photos/" + Math.floor(Math.random() * 500) + "/100";
    setImage(newImage);
  }, []);

  return (
    <div>
      <img
        src={image}
        alt="Clickable Image"
        onClick={() => {
          setCreatedMemeImage(image);
          console.log("Image Clicked");
        }}
      />
      <h3>{memeCaption ?? ""}</h3>
    </div>
  );
}

export default ImageContainer;
//gifURL || "https://i.imgur.com/MK3eW3As.jpg"
