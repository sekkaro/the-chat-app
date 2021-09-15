import { io } from "socket.io-client";

const main = () => {
  const socket = io("/");

  socket.on("message", (message) => {
    console.log(message);
  });

  window.addEventListener("load", () => {
    document.querySelector("#message-form")?.addEventListener("submit", (e) => {
      e.preventDefault();

      const message = (e.target as any).elements.message.value;

      socket.emit("sendMessage", message);
    });
  });
};

main();
