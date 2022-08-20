const app = require("express")();
const socketIo = require("socket.io");
const http = require("http").Server(app);
const io = socketIo(http);
const port = process.env.PORT || 3001;

var users = []; // 储存登录用户
var usersInfo = []; // 存储用户姓名和头像

app.get("/", (req, res) => {
  // __dirname 根目录
  // res.sendFile(__dirname + "/public");
  res.send({
    data: "hello world!",
  });
});

io.on("connect", (socket) => {
  console.log("连接成功");
});

io.on("connection", (socket) => {
  socket.emit("message", "你好！");
  // 在线人员
  io.emit("disUser", usersInfo);
  // 检测用户上线
  socket.on("login", (user) => {
    if (users.indexOf(user) > -1) {
      // socket.emit("loginError");
    } else {
      users.push(user);
      usersInfo.push(user);

      socket.emit("loginSuc");
      socket.nickname = user;
      io.emit("system", {
        name: user.name,
        status: "进入",
      });
      io.emit("disUser", usersInfo);
      console.log("当前在线用户人数" + users.length);
    }
  });

  socket.on("eventname", (msg) => {
    console.log("接收到来自客户端的eventname事件", msg);
  });
});

// 查询在线人数user 信息
function getOnlineUsers() {
  let userlist = [];
  io.sockets.sockets.forEach((value, key) => {
    userlist.push(value.user);
  });
  return userlist;
}

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
