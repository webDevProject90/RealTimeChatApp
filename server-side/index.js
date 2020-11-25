const socketio = require('socket.io');
const express = require('express');
const http = require('http');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
app.use(express.json());
app.use(cors());

const PORT = 5000;
server.listen(5000,()=> console.log('server started on '+PORT));

http.createServer(function(req,res){
    res.writeHead(200,{
    'Access-Control-Allow-Origin' :  '*',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE',
    'Content-Type' : 'text/plain'
    });
  res.end('ended');  
}).listen(3000);

const users = {};

io.on('connection', (socket) => {
    socket.on('new-user', name => {
        users[socket.id] = name;
        socket.broadcast.emit('user connected', name);
    });
    
    socket.on('join',({name,number}) => {
        socket.broadcast.emit('chat-message',name+'with'+number+'joined');
    });

    socket.on('send-chat-message', message => {
        socket.broadcast.emit('chat-message', {message : message, name : users[socket.id] });
    });

    socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnected', users[socket.id])
        delete users[socket.id]
    });

}   
})