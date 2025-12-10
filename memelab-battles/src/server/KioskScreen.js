// Kiosk screen management
import { useState } from "react";

import LobbyScreen from "../kiosk-screens/LobbyScreen_Kiosk";
import CreateMemeScreen from "../kiosk-screens/CreatingMemeScreen_Kiosk";
import VotingScreen from "../kiosk-screens/VotingScreen_Kiosk";

function KioskScreen() {
  const [currentKiosk, setCurrentKiosk] = useState(0);
  // 0 = LobbyScreen
  // 1 = CreateMemeScreen
  // 2 = VotingScreen

  // Dummy data for players in the lobby
  const dummyPlayers = ["Justin", "Dan"];
  const dummyLobbyName = "Dummy Demo";

  switch (currentKiosk) {
    case 0:
      return (
        <LobbyScreen
          setCurrentKiosk={setCurrentKiosk}
          players={dummyPlayers}
          lobbyName={dummyLobbyName}
        />
      );
    case 1:
      return <CreateMemeScreen setCurrentKiosk={setCurrentKiosk} />;
    case 2:
      return <VotingScreen setCurrentKiosk={setCurrentKiosk} />;
    default:
      return;
  }
}
export default KioskScreen;
