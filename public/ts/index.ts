import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";
import qs from "qs";

import { sendMessage } from "./sendMessage";
import { sendLocation } from "./sendLocation";
import { renderMessage } from "./renderMessage";
import { renderLocation } from "./renderLocation";
import { renderSidebar } from "./renderSidebar";

const render = (
  socket: Socket<DefaultEventsMap, DefaultEventsMap>,
  $messages: Element | null
) => {
  renderMessage(socket, $messages);

  renderLocation(socket, $messages);

  renderSidebar(socket);
};

const send = (
  socket: Socket<DefaultEventsMap, DefaultEventsMap>,
  $messages: Element | null
) => {
  sendMessage(socket, $messages);

  sendLocation(socket, $messages);
};

const main = () => {
  const socket = io("/");

  const { username, room } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  socket.emit("join", { username, room }, (error: string) => {
    if (error) {
      alert(error);
      location.href = "/";
    }
  });

  window.addEventListener("load", () => {
    const $messages = document?.querySelector("#messages");
    render(socket, $messages);

    send(socket, $messages);
  });
};

main();
