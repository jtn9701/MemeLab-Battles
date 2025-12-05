// Player Screen Manager
import { useState } from "react";

import CreateMemeScreen from "../player-screens/CreateMeme_Player";
import LobbyScreenPlayer from "../player-screens/LobbyScreen_Player";
import VotingScreen from "../player-screens/VotingScreen_Player";

function PlayerScreen() {
  // 0 = LobbyScreen
  // 1 = CreateMemeScreen
  // 2 = VotingScreen
  const [currentScreen, setCurrentScreen] = useState(0);
  const [savedMemeURL, setSavedMemeURL] = useState("");

  // Shape of list: [{"url": "testURL1"}, {"url": "testURL2"}, ...]
  // Dummy data: {"url": "https://i.imgflip.com/1bij.jpg"}
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
      return;
  }
}

export default PlayerScreen;
