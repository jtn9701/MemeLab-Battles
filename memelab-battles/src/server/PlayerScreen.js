// Player Screen Manager
import { useEffect, useState } from "react";
import socket from "../lib/socket";

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
  const [savedMemesList, setSavedMemesList] = useState([]);

  useEffect(() => {
    const handleMemeCreationStarted = () => setCurrentScreen(1);
    const handleVotingStarted = (memeList) => {
      setSavedMemesList(memeList || []);
      setCurrentScreen(2);
    };
    const handleGameReset = () => {
      setCurrentScreen(0);
      setSavedMemesList([]);
      setMemeWithText({ url: "", textBoxes: [] });
    };

    socket.on("memeCreationStarted", handleMemeCreationStarted);
    socket.on("votingStarted", handleVotingStarted);
    socket.on("gameReset", handleGameReset);

    return () => {
      socket.off("memeCreationStarted", handleMemeCreationStarted);
      socket.off("votingStarted", handleVotingStarted);
      socket.off("gameReset", handleGameReset);
    };
  }, []);

  switch (currentScreen) {
    case 0:
      return (
        <LobbyScreenPlayer
          socket={socket}
          setCurrentScreen={setCurrentScreen}
          username={username}
          setUsername={setUsername}
          setMemeWithText={updateMemeWithText}
        />
      );
    case 1:
      return (
        <CreateMemeScreen
          socket={socket}
          setCurrentScreen={setCurrentScreen}
          savedWithText={savedWithText}
          setMemeWithText={updateMemeWithText}
        />
      );
    case 2:
      return (
        <VotingScreen
          socket={socket}
          memeList={savedMemesList}
          savedWithText={savedWithText}
          setMemeWithText={updateMemeWithText}
        />
      );
    default:
  }
}

export default PlayerScreen;
