import { render } from "mustache";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";
import { RoomData } from "../../src/types";

export const renderSidebar = (
  socket: Socket<DefaultEventsMap, DefaultEventsMap>
) => {
  const sidebarTemplate =
    document.querySelector("#sidebar-template")!.innerHTML;
  socket.on("roomData", ({ room, users }: RoomData) => {
    const html = render(sidebarTemplate, {
      room,
      users,
    });
    document.querySelector("#sidebar")!.innerHTML = html;
  });
};
