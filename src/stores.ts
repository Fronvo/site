import { writable } from "svelte/store";
import { io } from "socket.io-client";
import parser from "socket.io-msgpack-parser";

// upon page reload
export const customFadeDuration: number = 500;

// use 'socket' var name in other files, dont reserve
export const sockt = writable();

// replace with ws://localhost:3001 if hosting locally
const tempSocket = io("wss://fronvosrv.herokuapp.com", {
  // only websocket transport, no http polling
  transports: ["websocket"],
  path: "/fronvo",
  parser: parser,
});

tempSocket.on("connect", () => {
  sockt.set(tempSocket);
});
