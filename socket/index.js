const socketio = require("socket.io");
const express = require("express");
const http = require("http");

const app = express();
const server = http.createServer(app);
const PORT = 5500;

const io = socketio(server);
io.on("connection", (socket) => {
  const { url } = socket.request;
  console.log(`소켓 연결됨: ${url}`);
});

server.listen(PORT, () => console.log(`💬 Socket server listening on: ${PORT} `));
