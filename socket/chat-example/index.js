var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var utils = require('./utils');

app.get('/', function(req, res){
    // res.send('<h1>Hello World</h1>');
    res.sendFile(__dirname + '/index.html')
});
app.get('/about', function(req, res){
    res.sendFile(__dirname + '/about.html')
});

userNum = 0;
users = [];

io.on('connection', function(socket){
    // if(socket.handshake.query.userName){
    //   userNum++;
    // }
    var userName = socket.handshake.query.userName;
    if((users.filter(item => item == userName)).length == 0){
      userNum++;
    }
    console.log(socket.handshake.query.userName,1111111);
    // users.push(socket.handshake.query.userName);
    utils.pushUser(users,socket.handshake.query.userName);
    console.log('目前在线用户:' + users);
    io.emit('userNum',userNum);
    io.emit('users',users);
    console.log('目前在线人数' + userNum);
    console.log('a user connected');
    socket.on('disconnect', function(){
      userNum--;
      utils.removeUser(users,userName);
      io.emit('users',users);
      io.emit('userNum',userNum);
      console.log(userNum);
      console.log('user disconnected');
      console.log(userName,'这是退出的人的名字');
    });
    socket.on('chat_message', function(msg){
      io.emit('chat_message', msg);
      console.log('message: ' + msg);
    });
    socket.on('login', function(data){
      console.log(userNum,'login');
      console.log(data);
      socket.broadcast.emit('loginNews',data);
    });
    // socket.on('userLogout', function(uname){
    //   utils.removeUser(users,uname);
    //   io.emit('users',users);
    //   console.log(uname,'这是退出的人的名字');
    // });
});

// 配置允许跨域请求；
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://www.hjslihaoaijiaqi.club')
  res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', ' 3.2.1')
  next()
})

http.listen(3000, function(){
    console.log('listening on *:3000');
});