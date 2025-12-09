// Kiosk screen management
import { useEffect, useState } from "react";
import socket from "../lib/socket";

import LobbyScreen from "../kiosk-screens/LobbyScreen_Kiosk";
import CreateMemeScreen from "../kiosk-screens/CreatingMemeScreen_Kiosk";
import VotingScreen from "../kiosk-screens/VotingScreen_Kiosk";

function KioskScreen() {
  const [currentKiosk, setCurrentKiosk] = useState(0);
  const [players, setPlayers] = useState([]);
  // 0 = LobbyScreen
  // 1 = CreateMemeScreen
  // 2 = VotingScreen

  useEffect(() => {
    const toCreate = () => setCurrentKiosk(1);
    const toVoting = () => setCurrentKiosk(2);
    const toLobby = () => setCurrentKiosk(0);
    const handlePlayers = (list) => setPlayers(list || []);

    socket.on("memeCreationStarted", toCreate);
    socket.on("votingStarted", toVoting);
    socket.on("gameReset", toLobby);
    socket.on("playersUpdated", handlePlayers);

    return () => {
      socket.off("memeCreationStarted", toCreate);
      socket.off("votingStarted", toVoting);
      socket.off("gameReset", toLobby);
      socket.off("playersUpdated", handlePlayers);
    };
  }, []);

  switch (currentKiosk) {
    case 0:
      return (
        <LobbyScreen
          setCurrentKiosk={setCurrentKiosk}
          players={players}
          lobbyName="MemeLab Lobby"
        />
      );
    case 1:
      return <CreateMemeScreen setCurrentKiosk={setCurrentKiosk} />;
    case 2:
      return <VotingScreen setCurrentKiosk={setCurrentKiosk} />;
    default:
      return null;
  }
}
export default KioskScreen;