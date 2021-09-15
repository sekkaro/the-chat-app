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

      socket.emit("sendMessage", message, (error: string | undefined) => {
        if (error) {
          return console.log(error);
        }
        console.log("the message was delivered");
      });
    });

    document.querySelector("#send-location")?.addEventListener("click", () => {
      if (!navigator.geolocation) {
        return alert("Geolocation is not supported by your browser");
      }

      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        socket.emit(
          "sendLocation",
          {
            latitude,
            longitude,
          },
          () => {
            console.log("location shared");
          }
        );
      });
    });
  });
};

main();
