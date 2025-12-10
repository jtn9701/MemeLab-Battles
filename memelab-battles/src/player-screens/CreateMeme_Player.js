import { useState, useEffect } from "react";

import ImageGallery from "../Components/Image_Gallery";
import MemeContainer from "../Components/Meme_Container";

import { get_imgflip_meme } from "../APIs/ImgflipAPI";

function CreateMemeScreen({ savedWithText, setMemeWithText, setCurrentScreen }) {
  const [memeList, setMemeList] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [newText, setNewText] = useState("");
  const [position, setPosition] = useState("top");
  const promptList = [
    "CSCI",
    "UNO",
    "",
    "AI",
    "Game Dev",
    "Sofware Engineering",
  ];

  function addTextbox() {
    const newTextBox = {
      id: Date.now(),
      text: newText && newText.length > 0 ? newText : "Add text here",
      position: position || "top",
    };

    const textBoxes = savedWithText.textBoxes || [];
    setMemeWithText({
      ...savedWithText,
      textBoxes: [...textBoxes, newTextBox],
    });

    // clear the input after adding
    setNewText("");
  }

  function clearTextboxes() {
    setMemeWithText({ ...(savedWithText || {}), textBoxes: [] });
    setNewText("");
  }

  function submitCreatedMeme() {
    console.log(savedWithText);
    if (savedWithText.url) return <MemeContainer meme={savedWithText} />;
  }

  useEffect(() => {
    async function findMemes() {
      const memes = await get_imgflip_meme();
      setMemeList(memes);
    }

    function chooseRandPrompt() {
      const randomIndex = Math.floor(Math.random() * promptList.length);
      const newPrompt = promptList[randomIndex];
      console.log("CreateMemeScreen: chosen prompt ->", newPrompt);
      setPrompt(newPrompt);
    }

    chooseRandPrompt();
    findMemes();
  }, []);

  return (
    <div>
      <h1>Create a {prompt} meme</h1>
      {memeList.length > 0 ? (
        <>
          <ImageGallery
            memeList={memeList}
            savedWithText={savedWithText}
            setMemeWithText={setMemeWithText}
          />
          <h3>Click a meme and Submit</h3>
          <div style={{ margin: "8px 0" }}>
            <label style={{ marginRight: 8 }}>
              Text:
              <input
                type="text"
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                placeholder="Enter textbox text"
                style={{ marginLeft: 8 }}
              />
            </label>
            <label style={{ marginLeft: 12 }}>
              Position:
              <select
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                style={{ marginLeft: 8 }}
              >
                <option value="top">Top</option>
                <option value="middle">Middle</option>
                <option value="bottom">Bottom</option>
              </select>
            </label>
          </div>
          <button onClick={addTextbox}>Add Textbox</button>
          <button onClick={clearTextboxes} style={{ marginLeft: 8 }}>
            Clear Textboxes
          </button>
          <button
            onClick={() => {
              console.log(savedWithText);
              setMemeWithText(savedWithText);
              setCurrentScreen(2); // Navigate to VotingScreen
            }}
          >
            Submit Meme
          </button>
          {submitCreatedMeme()}
        </>
      ) : (
        <p>Loading memes...</p>
      )}
    </div>
  );
}

export default CreateMemeScreen;
