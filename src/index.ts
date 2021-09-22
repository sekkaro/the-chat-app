import express from "express";
import { createServer } from "http";
import path from "path";
import { Server } from "socket.io";
import Filter from "bad-words";

import { Location } from "./types";
import { generateLocationMessage, generateMessage } from "./utils/messages";
import { addUser, getUser, getUsersInRoom, removeUser } from "./utils/users";
import { User } from "./models";

const main = () => {
  const app = express();
  const server = createServer(app);
  const io = new Server(server);

  app.use(express.static(path.join(__dirname, "../public")));

  io.on("connection", (socket) => {
    console.log("new web socket connection");

    socket.on("join", ({ username, room }, callback) => {
      if (!username || !room) {
        return callback("username or room is undefined");
      }
      const { error, user } = addUser(new User(socket.id, username, room));
      if (error) {
        return callback(error);
      }

      socket.join(user!.room);

      socket.emit("message", generateMessage("Welcome!", "Admin"));
      socket.broadcast
        .to(user!.room)
        .emit(
          "message",
          generateMessage(`${user!.username} has joined!`, "Admin")
        );
      io.to(user!.room).emit("roomData", {
        room: user!.room,
        users: getUsersInRoom(user!.room),
      });

      callback();
    });

    socket.on("sendMessage", (message, callback) => {
      const filter = new Filter();

      if (filter.isProfane(message)) {
        return callback("Profanity is not allowed");
      }

      const user = getUser(socket.id);

      if (!user) {
        console.log("error has occured while sending message");
        return;
      }

      const { room, username } = user;

      io.to(room).emit("message", generateMessage(message, username));
      callback();
    });

    socket.on("sendLocation", (location: Location, callback) => {
      const { longitude, latitude } = location;

      const user = getUser(socket.id);

      if (!user) {
        console.log("error has occured while sending location");
        return;
      }

      const { room, username } = user;

      io.to(room).emit(
        "locationMessage",
        generateLocationMessage(
          `https://google.com/maps?q=${longitude},${latitude}`,
          username
        )
      );

      callback();
    });

    socket.on("disconnect", () => {
      const { error, user } = removeUser(socket.id);

      if (error) {
        console.log("error has occured while disconnecting");
        return;
      }

      const { room, username } = user!;

      io.to(room).emit(
        "message",
        generateMessage(`${username} has left`, "Admin")
      );

      io.to(room).emit("roomData", {
        room: room,
        users: getUsersInRoom(room),
      });
    });
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
  });
};

main();
