const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const cors=require("cors")
app.use(cors())


const users={}

io.on('connection', (socket) => {

    socket.on(`new-user`,name=>{
        users[socket.id]=name;
        socket.broadcast.emit(`user-connected`,name)
    })
    socket.on('disconnect', () => {
        socket.broadcast.emit(`user-disconnected`, users[socket.id])
        delete users[socket.id]
      });


    socket.on(`send-chat-message`,message=>{
        socket.broadcast.emit(`chat-message`,{message:message,name:users[socket.id]})
    })
  });

server.listen(3000, () => {
  console.log('listening on *:3000');
});