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
      return <VotingScreen />;
    default:
      return;
  }
}

export default PlayerScreen;
