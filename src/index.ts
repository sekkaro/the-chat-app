import express from "express";
import { createServer } from "http";
import path from "path";
import { Server } from "socket.io";

const main = () => {
  const app = express();
  const server = createServer(app);
  const io = new Server(server);

  app.use(express.static(path.join(__dirname, "../public")));

  io.on("connection", (socket) => {
    console.log("new web socket connection");

    socket.emit("message", "Welcome!");

    socket.on("sendMessage", (message) => {
      io.emit("message", message);
    });
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
  });
};

main();
