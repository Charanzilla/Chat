const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Store chat history
const chatHistory = [];
const MAX_HISTORY_LENGTH = 100; // Limit the number of messages to store

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('A user connected');

  // Send the current chat history to the newly connected user
  socket.emit('chat history', chatHistory);

  socket.on('chat message', (data) => {
    // Add the new message to history
    chatHistory.push(data);
    // Keep history length in check
    if (chatHistory.length > MAX_HISTORY_LENGTH) {
      chatHistory.shift(); // Remove the oldest message
    }
    io.emit('chat message', data); // Broadcast the new message to all connected clients
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
