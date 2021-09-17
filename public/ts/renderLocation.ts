import { render } from "mustache";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";

export const renderLocation = (
  socket: Socket<DefaultEventsMap, DefaultEventsMap>,
  $messages: Element | null
) => {
  const locationTemplate =
    document?.querySelector("#location-template")!.innerHTML;

  socket.on("locationMessage", (url) => {
    console.log(url);

    const html = render(locationTemplate, {
      url,
    });

    $messages?.insertAdjacentHTML("beforeend", html);
  });
};
