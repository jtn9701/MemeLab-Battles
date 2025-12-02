import { useEffect, useState } from "react";

import ImageContainer from "./Image_Container";
import { grab_data } from "../APIs/Tenor";

// TODO: possibly turn this into a "flat list"
function ImageGallery() {
  const [gifs, setGIFS] = useState([]);

  useEffect(() => {
    grab_data("smile").then((gifUrls) => setGIFS(gifUrls));
  }, []);

  return (
    <div>
      {gifs.map((gif, index) => (
        <ImageContainer key={index} gifURL={gif} />
      ))}
    </div>
  );
}

export default ImageGallery;
