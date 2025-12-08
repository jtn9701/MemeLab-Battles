import ImageContainer from "./Image_Container";
import "./Image_Gallery.css";

function ImageGallery({ memeList, savedWithText, setMemeWithText }) {
  return (
    <div className="gallery-container">
      <div className="gallery-scroll">
        {memeList.length > 0 ? (
          memeList.map((meme, index) => (
            <ImageContainer
              key={index}
              imageURL={meme.url}
              savedWithText={savedWithText}
              setMemeWithText={setMemeWithText}
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
