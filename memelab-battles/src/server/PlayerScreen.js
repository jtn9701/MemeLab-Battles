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
  const [username, setUsername] = useState("");

  // Test data
  //  {
  //    username: "User",
  //    url: "https://i.imgflip.com/1bij.jpg",
  //    textBoxes: [{ id: 1, text: "Top text", position: "top" }]
  //  }
  const [savedWithText, setMemeWithText] = useState({
    username: "",
    url: "",
    textBoxes: [], // Array of {id, text, position}
  });

  // Wrapper function to ensure username is always preserved in meme metadata
  const updateMemeWithText = (memeData) => {
    setMemeWithText({
      ...memeData,
      username: memeData.username || username || "Anonymous",
    });
  };

  // Shape of list: [{"url": "testURL1"}, {"url": "testURL2"}, ...]
  // Dummy data: {"url": "https://i.imgflip.com/1bij.jpg"}
  // Contains all players' memes. Will be used for Voting
  const [savedMemesList, setSavedMemesList] = useState([
    {
      textBoxes: [{ id: 1765334539988, text: "for an A", position: "bottom" }],
      url: "https://i.imgflip.com/3oevdk.jpg",
    },
    {
      textBoxes: [{ id: 1765169743634, text: "test", position: "top" }],
      url: "https://i.imgflip.com/1ur9b0.jpg",
    },
  ]);

  switch (currentScreen) {
    case 0:
      return (
        <LobbyScreenPlayer
          setCurrentScreen={setCurrentScreen}
          username={username}
          setUsername={setUsername}
          setMemeWithText={updateMemeWithText}
        />
      );
    case 1:
      return (
        <CreateMemeScreen
          setCurrentScreen={setCurrentScreen}
          savedWithText={savedWithText}
          setMemeWithText={updateMemeWithText}
        />
      );
    case 2:
      return (
        <VotingScreen
          memeList={savedMemesList}
          savedWithText={savedWithText}
          setMemeWithText={updateMemeWithText}
          setCurrentScreen={setCurrentScreen}
        />
      );
    default:
  }
}

export default PlayerScreen;
