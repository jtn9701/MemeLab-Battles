import React from "react";
import "./Meme_Container.css";

function MemeContainer({ meme, onClick }) {
  const { url, textBoxes } = meme;

  return (
    <div className="meme-item">
      <div className="meme-wrapper">
        <img
          className="meme-item-img"
          src={url}
          alt="Meme with text"
          onError={() => {
            console.log("Meme image failed to load: ", url);
          }}
        />
        {/* Render text overlays */}
        {textBoxes && textBoxes.length > 0 && (
          <div className="text-overlay-container">
            {textBoxes.map((textBox) => (
              <div
                key={textBox.id}
                className={`text-overlay text-${textBox.position}`}
              >
                {textBox.text}
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Optional click handler */}
      {onClick && (
        <button className="meme-action-btn" onClick={() => onClick(meme)}>
          Select
        </button>
      )}
    </div>
  );
}

export default MemeContainer;
