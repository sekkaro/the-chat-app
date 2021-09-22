import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";

export const sendMessage = (
  socket: Socket<DefaultEventsMap, DefaultEventsMap>,
  $messages: Element | null
) => {
  const $messageForm = document.querySelector("#message-form");
  const $messageFormInput = $messageForm?.querySelector("input");
  const $messageFormButton = $messageForm?.querySelector("button");

  $messageForm?.addEventListener("submit", (e) => {
    e.preventDefault();

    $messageFormButton?.setAttribute("disabled", "disabled");

    const message = (e.target as any).elements.message.value;

    socket.emit("sendMessage", message, (error: string | undefined) => {
      $messageFormButton?.removeAttribute("disabled");
      $messageFormInput!.value = "";
      $messageFormInput?.focus();
      if (error) {
        return console.log(error);
      }
      console.log("the message was delivered");
      $messages!.scrollTop = $messages!.scrollHeight;
    });
  });
};
