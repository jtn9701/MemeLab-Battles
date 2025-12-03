import { useEffect, useState } from "react";

import ImageContainer from "./Image_Container";
import { grab_data } from "../APIs/Tenor";

// TODO: possibly turn this into a "flat list"
function ImageGallery({ setCreatedMemeImage }) {
  //const [gifs, setGIFS] = useState([]);

  //useEffect(() => {
  //  grab_data("smile").then((gifUrls) => setGIFS(gifUrls));
  //}, []);

  //{gifs.map((gif, index) => (
  //      <ImageContainer key={index} gifURL={gif} />
  //    ))}

  return (
    <div>
      <ImageContainer key={"img-1"} setCreatedMemeImage={setCreatedMemeImage} />
      <ImageContainer key={"img-2"} setCreatedMemeImage={setCreatedMemeImage} />
      <ImageContainer key={"img-3"} setCreatedMemeImage={setCreatedMemeImage} />
    </div>
  );
}

export default ImageGallery;
