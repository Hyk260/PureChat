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
  // 在线人员
  io.emit("disUser", users);
  // 检测用户上线
  socket.on("login", (user) => {
    const { name } = user;
    console.log(user, "用户信息");
    if (users.indexOf(name) == -1) {
      users.push(name);
      socket.nickname = name;
      io.emit("system", {
        name,
        status: "进入",
      });
      io.emit("disUser", users);
      console.log("当前在线用户人数" + users.length);
    }
  });
  // 检测用户下线
  socket.on("disconnect", () => {
    var index = users.indexOf(socket.nickname);
    if (index > -1) {
      // 避免是undefined
      users.splice(index, 1); // 删除用户信息

      io.emit("system", {
        // 系统通知
        name: socket.nickname,
        status: "离开",
      });

      io.emit("disUser", users);
      console.log(`${socket.nickname}用户离开`);
    }
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
