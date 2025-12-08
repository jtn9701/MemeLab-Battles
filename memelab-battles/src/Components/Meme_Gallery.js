import MemeContainer from "./Meme_Container";
import "./Meme_Gallery.css";

function MemeGallery({ memeList, onClick }) {
  return (
    <div className="gallery-container">
      <div className="gallery-scroll">
        {memeList.length > 0 ? (
          memeList.map((meme, index) => (
            <MemeContainer key={index} meme={meme} onClick={onClick} />
          ))
        ) : (
          <p>No memes available</p>
        )}
      </div>
    </div>
  );
}

export default MemeGallery;
