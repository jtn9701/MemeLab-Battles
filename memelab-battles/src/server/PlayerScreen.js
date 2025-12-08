// Player Screen Manager
import { useState } from "react";

import CreateMemeScreen from "../player-screens/CreateMeme_Player";
import LobbyScreenPlayer from "../player-screens/LobbyScreen_Player";
import VotingScreen from "../player-screens/VotingScreen_Player";
import MemeContainer from "../Components/Meme_Container";

function PlayerScreen() {
  // 0 = LobbyScreen
  // 1 = CreateMemeScreen
  // 2 = VotingScreen
  // Screen navigation
  const [currentScreen, setCurrentScreen] = useState(1);

  // This player's created meme
  const [savedMemeURL, setSavedMemeURL] = useState("");

  // Meme with text
  // const [savedMemesList, setSavedMemesList] = useState([
  //  {
  //    url: "https://i.imgflip.com/1bij.jpg",
  //    textBoxes: [{ id: 1, text: "Top text", position: "top" }]
  //  }
  // ]);
  const [savedWithText, setMemeWithText] = useState({
    url: "",
    textBoxes: [], // Array of {id, text, position}
  });

  // Shape of list: [{"url": "testURL1"}, {"url": "testURL2"}, ...]
  // Dummy data: {"url": "https://i.imgflip.com/1bij.jpg"}
  // Contains all players' memes. Will be used for Voting
  const [savedMemesList, setSavedMemesList] = useState([
    { url: "https://i.imgflip.com/1bij.jpg" },
    { url: "https://i.imgflip.com/26am.jpg" },
  ]);

  switch (currentScreen) {
    case 0:
      return <LobbyScreenPlayer setCurrentScreen={setCurrentScreen} />;
    case 1:
      return (
        <CreateMemeScreen
          setCurrentScreen={setCurrentScreen}
          savedMemeURL={savedMemeURL}
          setSavedMemeURL={setSavedMemeURL}
          savedWithText={savedWithText}
          setMemeWithText={setMemeWithText}
        />
      );
    case 2:
      return (
        <VotingScreen
          memeList={savedMemesList}
          savedMemeURL={savedMemeURL}
          setSavedMemeURL={setSavedMemeURL}
        />
      );
    default:
      return (
        <MemeContainer
          meme={{
            url: "https://i.imgflip.com/1bij.jpg",
            textBoxes: [
              { id: 1, text: "Top text", position: "top" },
              { id: 3, text: "Middle text", position: "Center" },
              { id: 2, text: "Bottom text", position: "Bottom" },
            ],
          }}
        />
      );
      return;
  }
}

export default PlayerScreen;
