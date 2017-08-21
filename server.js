// Invoke 'strict' JavaScript mode
'use strict';

// Setup basic express server
var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;
var loopLimit = 0;

//variables 
var sockets = []
var socketNames = [] //may as well
var games = []
var activegames = []

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'dist/index.html'));
});

var numUsers = 0;
io.on('connection', function (socket) {
  var addedUser = false;

  // when the client emits 'new message', this listens and executes
  socket.on('new message', function (data) {
    console.log(data)
    // we tell the client to execute 'new message'
    socket.broadcast.emit('new message', {
      username: data.username,
      color: data.color,
      message: data.message
    });
  });

  // when the client emits 'add user', this listens and executes
  socket.on('add user', function (username) {
    console.log(username)
    if (addedUser) return;
    sockets.push(socket);
    socketNames.push(username);
    // we store the username in the socket session for this client
    socket.username = username;
    ++numUsers;
    addedUser = true;

    socket.emit('login', {
      numUsers: numUsers
    });
    // echo globally (all clients) that a person has connected
    socket.broadcast.emit('user joined', {
      username: socket.username,
      numUsers: numUsers
    });
    socket.emit('userlist', socketNames);
    socket.broadcast.emit('userlist', socketNames);
  });

  // when the client emits 'typing', we broadcast it to others
  socket.on('typing', function () {
    socket.broadcast.emit('typing', {
      username: socket.username
    });
  });

  //game logic
  socket.on('new game', function (username) {
    games.push({
      name: `${username}'s game`,
      madeBy: username,
      numPlayers: 1,
      players: [username],
      state: `wait`
    })
    socket.emit('gamelist', games);
    socket.broadcast.emit('gamelist', games);
  });

  socket.on('join game', function (data) {
    for(var i = 0; i < games.length; i++) {
      if (games[i].madeBy == data.gameOwner) {
        games.splice(i, 1)

        //get user sockets
        var p1s;
        var p2s;
        for(var i = 0; i < sockets.length; i++)
          if (sockets[i].username == data.gameOwner)
            p1s = sockets[i]
        for(var i = 0; i < sockets.length; i++)
          if (sockets[i].username == data.joiner)
            p2s = sockets[i]

        activegames[data.gameOwner] = {
          p1: p1s,
          p2: p2s,
          blade: require('./blade')
        }

        activegames[data.gameOwner].p1.emit('start game', activegames[data.gameOwner].blade.firstHand(0))
        activegames[data.gameOwner].p2.emit('start game', activegames[data.gameOwner].blade.firstHand(1))
      }
    }
    socket.emit('gamelist', games);
    socket.broadcast.emit('gamelist', games);
  });

  socket.on('destroy game', function (user) {
    for(var i = 0; i < games.length; i++) {
      if (games[i].madeBy == user)
        games.splice(i, 1)
    }
    socket.emit('gamelist', games);
    socket.broadcast.emit('gamelist', games);
  });

  // when the client emits 'stop typing', we broadcast it to others
  socket.on('stop typing', function () {
    socket.broadcast.emit('stop typing', {
      username: socket.username
    });
  });

  // when the user disconnects.. perform this
  socket.on('disconnect', function () {
    if (addedUser) {
      --numUsers;
      //killGame(socket);
      for(var i = 0; i < sockets.length; i++) {
        if (sockets[i].username == socket.username)
          sockets.splice(i, 1)
        if (socketNames[i] == socket.username)
          socketNames.splice(i, 1)
      }
      socket.emit('userlist', socketNames);
      socket.broadcast.emit('userlist', socketNames);
      // echo globally that this client has left
      socket.broadcast.emit('user left', {
        username: socket.username,
        numUsers: numUsers
      });
    }
  });

});

server.listen(port, function () {
  console.log('Server listening at port %d', port);
  fs.writeFile(__dirname + '/start.log', 'started'); 
});