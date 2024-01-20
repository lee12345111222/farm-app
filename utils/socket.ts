import { io } from "socket.io-client";

const URL = "http://54.153.241.236:8000";

export const socket = io(URL, {
  withCredentials: true,
  path: "/ws/chat/0001",
  transports: ["websocket"],
});


