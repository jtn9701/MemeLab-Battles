import { io } from "socket.io-client";

// Shared Socket.IO client for both player and kiosk views.
export const SOCKET_URL =
  process.env.REACT_APP_SOCKET_URL || "http://localhost:4000";

const socket = io(SOCKET_URL, { autoConnect: true });

export default socket;

