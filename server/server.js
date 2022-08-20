const express = require("express");
const socketIo = require("socket.io");
const http = require("http");
const FileSync = require("lowdb/adapters/FileSync");
const low = require("lowdb");
const adapter = new FileSync("./db/message.json");
const session = require("express-session");
//鉴定权限
const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: true });
const db = low(adapter);

let sessionMiddleware = session({
  secret: "DW2009",
  resave: true,
  saveUninitialized: true,
});
app.use(express.static("public"));
//配置
app.use(sessionMiddleware);

app.use((req, res, next) => {
  // 允许前端自定义请求头 authorization
  // 前端通过请求头中的authorization带token到后台
  // 注意默认情况 Token 必须以 Bearer+空格 开头
  res.setHeader("Access-Control-Allow-Headers", "authorization");
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

//登录
app.get("/login", function (req, res) {
  let { phone, password } = req.query;
  console.log(phone, "手机号", password, "密码");
  if (phone && password) {
    let db_user = db.get("users").find({ phone: phone }).value();
    console.log(db_user, "用户账号");

    if (db_user.password === password) {
      req.session.user = db_user;
      res.json({ code: 2000, msg: "登录成功" });
    } else {
      res.json({ code: 2001, msg: "用户名或密码错误！" });
    }
  } else {
    res.json({ code: 2001, msg: "用户名或密码不合法!" });
  }
});

app.get("/test", function (req, res) {
  res.json(req.session.user || {});
});

// socket.io使用中间件session
io.use(function (socket, next) {
  //getsocket.io绑定请求
  //绑定之后，在只要有socket地方都可以访问到request
  sessionMiddleware(socket.request, {}, next);
});

// 查询在线人数user 信息
function getOnlineUsers() {
  let userlist = [];
  io.sockets.sockets.forEach(function (value, key) {
    userlist.push(value.user);
  });
  return userlist;
}

// 查询在线所有人socket
function getOnlineSockets() {
  let userlist = [];
  io.sockets.sockets.forEach(function (value, key) {
    userlist.push(value);
  });
  return userlist;
}

io.on("connection", function (socket) {
  console.log(socket.request.session.user);
  if (socket.request.session.user) {
    //在socket 同时存在socket.id 存在socket.request.session.user
    //连接成功之后 我把uid发给客户单 每个用户的uid是固定的
    socket.user = socket.request.session.user;

    var onlineUserList = getOnlineSockets();
    // onlineUserList.filter(function (item) {
    //     return item.user.uid = socket.user.uid;
    // }).filter(function(item){
    //     return item.id !== socket.id;
    // }).forEach(function(item){
    //     item.disconnect(true);
    // })
  } else {
    //及时通知客服端没有权限 断开屏幕
    socket.disconnect(true);
    return;
  }

  //当有新用户连接进来的时候  给所有在线用户更新在线人数
  io.emit("update:users", getOnlineUsers());

  // //当用户下线或者掉线  给所有在线用户更新在线人数
  socket.on("unconnet", function () {
    io.emit("update:users", getOnlineUsers());
  });

  //返回uid
  socket.emit("uid", socket.user);
  //console.log(socket.user)

  // 建立连接之后 开始记录历史消息到db.json
  if (!db.get("DW2009").value().length) {
    db.set("DW2009", []).write();
  }
  // 需要上线提醒(除我之外的其他人)
  socket.broadcast.emit("user:online", socket.user.nickName);

  //返回历史记录
  let historyMessageList = db.get("DW2009").value();
  socket.emit("message:history", historyMessageList);

  //公屏消息
  socket.on("message:public", function (msg) {
    // let { message } = msg;
    let _message = {
      uid: socket.user.uid,
      createTime: Date.now(),
      msg: msg,
      nickName: socket.user.nickName,
    };
    //返回公共消息
    io.emit("common", _message);
    // 添加到数据库
    db.get("DW2009").push(_message).write();
  });
});

server.listen(3131, () => {
  const host = null; // server.address().address
  const port = server.address().port;
  console.log("跑起来了");
  // console.log("应用实例，访问地址为 http://%s:%s", 'localhost', port)
  console.log(`server running @ http://${host ? host : "localhost"}:${port}`);
});
