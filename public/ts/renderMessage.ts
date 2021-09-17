import { render } from "mustache";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";

export const renderMessage = (
  socket: Socket<DefaultEventsMap, DefaultEventsMap>,
  $messages: Element | null
) => {
  const messageTemplate =
    document?.querySelector("#message-template")!.innerHTML;

  socket.on("message", (message) => {
    console.log(message);

    const html = render(messageTemplate, {
      message,
    });
    $messages?.insertAdjacentHTML("beforeend", html);
  });
};
