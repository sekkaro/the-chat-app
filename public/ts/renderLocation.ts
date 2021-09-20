import { render } from "mustache";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";
import { LocationMessageType } from "../../src/types";
import { formatTime } from "./utils/moment";

export const renderLocation = (
  socket: Socket<DefaultEventsMap, DefaultEventsMap>,
  $messages: Element | null
) => {
  const locationTemplate =
    document?.querySelector("#location-template")!.innerHTML;

  socket.on("locationMessage", (locationMessage: LocationMessageType) => {
    console.log(locationMessage);

    const html = render(locationTemplate, {
      url: locationMessage.url,
      createdAt: formatTime(locationMessage.createdAt),
    });

    $messages?.insertAdjacentHTML("beforeend", html);
  });
};
