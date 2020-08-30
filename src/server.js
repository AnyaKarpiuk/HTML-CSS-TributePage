const express = require('express');
const path = require('path');

const app = express();

const http = require('http');
const server = http.Server(app);

app.use('/static', express.static('public'));

app.get ('/', function(req, res){
    res.sendFile(path.join(__dirname, '/main.html'));
});

server.listen(process.env.port || 8080);

var io = require('socket.io')(server);

io.on('connection', function(socket){
    socket.on('message', function(msg){
        io.emit('message', msg)
    });
});


