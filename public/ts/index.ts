import { io } from "socket.io-client";

import { sendMessage } from "./sendMessage";
import { sendLocation } from "./sendLocation";
import { renderMessage } from "./renderMessage";

const main = () => {
  const socket = io("/");

  window.addEventListener("load", () => {
    renderMessage(socket);

    sendMessage(socket);

    sendLocation(socket);
  });
};

main();
