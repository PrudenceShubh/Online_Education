const { Server } = require('socket.io');
const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('message', (message) => {
    io.emit('message', message);
  });

  socket.on('disconnect', () => {
    io.emit('userLeft', socket.id);
    console.log('User disconnected:', socket.id);
  });
});

const PORT = 5005;
server.listen(PORT, () => {
  console.log(`WebSocket server running on port ${PORT}`);
});