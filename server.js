// const express = require('express');
// const http = require('http');
// const socketIo = require('socket.io');
//
// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server);
//
// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });
//
// io.on('connection', (socket) => {
//   console.log('A user connected');
//
//   socket.on('chat message', (msg) => {
//     io.emit('chat message', msg); // Broadcast message to all connected clients
//   });
//
//   socket.on('disconnect', () => {
//     console.log('User disconnected');
//   });
// });
//
// server.listen(3000, () => {
//   console.log('listening on *:3000');
// });


const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('chat message', (data) => { // Data will now be an object {username, message}
    io.emit('chat message', data); // Broadcast the object to all connected clients
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
