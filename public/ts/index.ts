import { io } from "socket.io-client";

const main = () => {
  const socket = io("/");
  console.log(socket);
  
};

main();
