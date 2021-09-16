import { io } from "socket.io-client";

import { sendMessage } from "./sendMessage";
import { sendLocation } from "./sendLocation";

const main = () => {
  const socket = io("/");

  socket.on("message", (message) => {
    console.log(message);
  });

  window.addEventListener("load", () => {
    sendMessage(socket);

    sendLocation(socket);
  });
};

main();
