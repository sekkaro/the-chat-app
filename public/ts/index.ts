import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";
import qs from "qs";

import { sendMessage } from "./sendMessage";
import { sendLocation } from "./sendLocation";
import { renderMessage } from "./renderMessage";
import { renderLocation } from "./renderLocation";

const render = (socket: Socket<DefaultEventsMap, DefaultEventsMap>) => {
  const $messages = document?.querySelector("#messages");

  renderMessage(socket, $messages);

  renderLocation(socket, $messages);
};

const send = (socket: Socket<DefaultEventsMap, DefaultEventsMap>) => {
  sendMessage(socket);

  sendLocation(socket);
};

const main = () => {
  const socket = io("/");

  const { username, room } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  socket.emit("join", { username, room });

  window.addEventListener("load", () => {
    render(socket);

    send(socket);
  });
};

main();
