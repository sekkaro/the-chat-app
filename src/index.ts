import express from "express";
import { createServer } from "http";
import path from "path";
import { Server } from "socket.io";
import Filter from "bad-words";

import { Location } from "./types";

const main = () => {
  const app = express();
  const server = createServer(app);
  const io = new Server(server);

  app.use(express.static(path.join(__dirname, "../public")));

  io.on("connection", (socket) => {
    console.log("new web socket connection");

    socket.emit("message", "Welcome!");
    socket.broadcast.emit("message", "A new user has joined!");

    socket.on("sendMessage", (message, callback) => {
      const filter = new Filter();

      if (filter.isProfane(message)) {
        return callback("Profanity is not allowed");
      }

      io.emit("message", message);
      callback();
    });

    socket.on("sendLocation", (location: Location, callback) => {
      const { longitude, latitude } = location;

      io.emit("message", `https://google.com/maps?q=${longitude},${latitude}`);

      callback();
    });

    socket.on("disconnect", () => {
      io.emit("message", "A user has left");
    });
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
  });
};

main();
