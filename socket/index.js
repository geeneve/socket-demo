const socketio = require("socket.io");
const express = require("express");
const http = require("http");

const app = express();
const server = http.createServer(app);
const PORT = 5500;

// express가 아닌 socket io 객체 내에서 cors 처리
const io = socketio(server, {
  cors: {
    origin: "http://localhost:8080",
  },
});

// 누군가가 소켓에 접속했을 때
io.on("connection", (socket) => {
  const { url } = socket.request;
  console.log(`소켓 연결됨: ${url}`);

  socket.on("chat", (msg) => {
    console.log(`유저가 메시지를 전송했습니다: ${msg}`);
    io.emit("chat", msg);
  });

  socket.on("disconnect", () => {
    console.log(`소켓 연결 해제됨: ${url}`);
  });
});

server.listen(PORT, () => console.log(`💬 Socket server listening on: ${PORT} `));
