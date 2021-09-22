import { render } from "mustache";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";

import { MessageType } from "../../src/types";
import { autoScroll } from "./utils/autoScroll";
import { formatTime } from "./utils/moment";

export const renderMessage = (
  socket: Socket<DefaultEventsMap, DefaultEventsMap>,
  $messages: Element | null
) => {
  const messageTemplate =
    document?.querySelector("#message-template")!.innerHTML;

  socket.on("message", (message: MessageType) => {
    console.log(message);

    const html = render(messageTemplate, {
      message: message.text,
      createdAt: formatTime(message.createdAt),
      username: message.username,
    });
    $messages?.insertAdjacentHTML("beforeend", html);
    autoScroll($messages);
  });
};
