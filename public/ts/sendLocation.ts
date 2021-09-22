import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";

export const sendLocation = (
  socket: Socket<DefaultEventsMap, DefaultEventsMap>,
  $messages: Element | null
) => {
  const $sendLocationButton = document.querySelector("#send-location");
  $sendLocationButton?.addEventListener("click", () => {
    if (!navigator.geolocation) {
      return alert("Geolocation is not supported by your browser");
    }

    $sendLocationButton.setAttribute("disabled", "disabled");

    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      socket.emit(
        "sendLocation",
        {
          latitude,
          longitude,
        },
        () => {
          $sendLocationButton.removeAttribute("disabled");
          console.log("location shared");
          $messages!.scrollTop = $messages!.scrollHeight;
        }
      );
    });
  });
};
