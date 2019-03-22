var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    // res.send('<h1>Hello World</h1>');
    res.sendFile(__dirname + '/index.html')
});
app.get('/about', function(req, res){
    res.sendFile(__dirname + '/about.html')
});

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
      console.log('user disconnected');
    });
    socket.on('chat_message', function(msg){
      io.emit('chat_message', msg)
      console.log('message: ' + msg);
    });
    socket.on('login', function(data){
      console.log(data)
      socket.broadcast.emit('loginNews',data);
    })
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});