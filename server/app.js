var express = require("express");
var _ = require("lodash");
// 文件数据库
var lowdb = require("lowdb");
// 生成唯一id
var { v4: uuid } = require("uuid");
// 生成token
var jwt = require("jsonwebtoken");

const fs = require("fs");
const path = require("path");
// 解析token
var expressJwt = require("express-jwt");

var FileSync = require("lowdb/adapters/FileSync");

const user = new FileSync("./db/user.json");

const role = new FileSync("./db/role.json");

const chat = new FileSync("./db/chat.json");

const menu = new FileSync("./db/menu.json");

const roleMenu = new FileSync("./db/roleMenu.json");
// 用户表
const db_user = lowdb(user);
// 角色表
const db_role = lowdb(role);
// 聊天内容
const db_chat = lowdb(chat);
// 菜单表
const db_menu = lowdb(menu);
// 角色菜单
const db_role_menu = lowdb(roleMenu);

const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

app.use((req, res, next) => {
  // 允许前端自定义请求头 authorization
  // 前端通过请求头中的authorization带token到后台
  // 注意默认情况 Token 必须以 Bearer+空格 开头
  res.setHeader("Access-Control-Allow-Headers", "authorization");
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

//设置静态文件目录 static
app.use(express.static(path.join(__dirname, "public")));

const SECRET_KEY = "7040575a-5ff5-4398-a410-d9c7b010f6e8";
app.use(
  expressJwt({
    secret: SECRET_KEY,
    algorithms: ["HS256"], //指定解析密文的算法
  }).unless({ path: ["/login", "/test", "/socket.io", "/favicon.ico"] })
);

// 登录
app.get("/login", async (req, res, next) => {
  let { username, password } = req.query;
  if (username && password) {
    const user = db_user.get("user").find({ username, password }).value();
    if (user) {
      res.setHeader("Access-Control-Expose-Headers", "x-token");
      // 注意默认情况 Token 必须以 Bearer+空格 开头
      const token = jwt.sign(user, SECRET_KEY, { expiresIn: 3600 * 24 * 3 });
      res.setHeader("X-token", "Bearer " + token);
      res.json({
        code: 200,
        msg: "登录成功!",
        result: user,
      });
    } else {
      res.json({
        code: 401,
        msg: "账号或则密码不正确",
      });
    }
  } else {
    res.json({
      code: 400,
      msg: "请求不合法",
    });
  }
  next();
});

// 获取聊天内容
app.get("/chat/record", async (req, res, next) => {
  let result = db_chat.get("chat").value();
  res.json({
    code: 200,
    msg: "ok",
    result,
  });
  next();
});
// 发送消息
app.get("/chat/sendMsg", async (req, res, next) => {
  let id = uuid();
  let { conv_id, conv_type, userProfile, message } = req.query;
  let chat = {
    message_client_time: Math.round(new Date().getTime() / 1000),
    message_conv_id: conv_id,
    message_conv_type: conv_type,
    message_elem_array: [JSON.parse(message)],
    message_is_from_self: true,
    message_is_peer_read: false,
    message_msg_id: id,
    message_sender_group_member_info: {},
    message_sender_profile: JSON.parse(userProfile),
    message_server_time: 0,
    message_status: 1,
  };
  db_chat.get("chat").push(chat).write();
  let result = db_chat.get("chat").value();
  res.json({
    code: 200,
    msg: "ok",
    result,
  });
  next();
});

// 返回菜单列表
app.get("/menu/query", async (req, res, next) => {
  res.json(db_menu.get("menu").value());
  next();
});
// 新增菜单
app.get("/menu/add", async (req, res, next) => {
  // id为父级id
  let { parentId, path, title, icon, componentName } = req.query;
  if (parentId && path && title && icon && componentName) {
    console.log(parentId, "parentId");
    let parentMenu = db_menu.get("menu").find({ id: parentId }).value();
    console.log(parentMenu, "查找当前选中菜单表");
    if (parentMenu) {
      let currentId = uuid(); //生成唯一ID
      let currentMenu = {
        id: currentId,
        url: `${parentMenu.url}${path[0] === "/" ? "" : "/"}${path}`,
        path,
        componentName,
        meta: {
          title,
          icon,
          auth: [],
        },
        children: [],
      };
      db_menu.get("menu").push(currentMenu).write(); //数据库添加菜单表
      parentMenu.children.push(currentId);
      db_menu
        .get("menu")
        .find({ id: parentId })
        .assign({ children: parentMenu.children })
        .write();
      res.json(db_menu.get("menu").value()); //返回新菜单表
    } else {
      res.json({ code: 400, msg: "参数不合法" });
    }
  } else {
    res.json({ code: 400, msg: "参数不合法" });
  }
  next();
});
// 删除菜单 菜单id 数组
app.get("/menu/delete", async (req, res, next) => {
  let { ids } = req.query;
  console.log(ids, "ids参数");
  if (ids?.length) {
    ids.forEach((id) => {
      let parentNode = db_menu
        .get("menu")
        .find((item) => {
          return item.children.indexOf(id) > -1;
        })
        .value();
      console.log(parentNode, "parentNode参数");
      let updatedChildren = parentNode.children.filter((v) => v !== id);

      db_menu
        .get("menu")
        .find((item) => {
          return item.children.indexOf(id) > -1;
        })
        .assign({ children: updatedChildren })
        .write();
      db_menu.get("menu").remove({ id }).write();
    });
    res.json(db_menu.get("menu").value());
    // res.json({ code: 200, msg: "测试" });
  } else {
    res.json({ code: 400, msg: "参数不合法" });
  }
  next();
});
// 更新菜单
app.get("/menu/update", async (req, res, next) => {
  if (_.has(req.query, "id", "path", "title", "icon", "componentName")) {
    let { id, path, title, icon, componentName } = req.query;
    console.log(icon, "icon");
    db_menu
      .get("menu")
      .find({ id })
      .assign({ path, meta: { title, icon, auth: [], modify: false } })
      .write();
    // componentName
    res.json(db_menu.get("menu").value());
  } else {
    res.json({ code: 400, msg: "参数不合法" });
  }
  next();
});

// 获取全部角色
app.get("/role/query", async (req, res, next) => {
  let result = db_role.get("role").value();
  res.json({
    code: 200,
    msg: "ok",
    result,
  });
  next();
});
// 添加角色
app.get("/role/add", async (req, res, next) => {
  if (_.has(req.query, "roleName", "info", "isDefaultRole")) {
    let { roleName, info, isDefaultRole } = req.query;
    console.log(req.query);
    let id = uuid();
    let currentTime = Date.now();
    let roleData = {
      id,
      roleName,
      info,
      createTime: currentTime,
      updateTime: currentTime,
      isDefaultRole: false,
    };
    db_role.get("role").push(roleData).write();
    res.json({
      code: 200,
      msg: "添加成功",
      result: roleData,
    });
  } else {
    res.json({
      code: 400,
      msg: "参数错误",
    });
  }
  next();
});
// 更新角色
app.get("/role/update", async (req, res, next) => {
  if (_.has(req.query, "roleName", "info", "isDefaultRole", "id")) {
    let { roleName, info, isDefaultRole, id } = req.query;
    let currentTime = Date.now();
    let roleData = {
      roleName,
      info,
      updateTime: currentTime,
      isDefaultRole: false,
    };
    db_role.get("role").find({ id }).assign(roleData).write();
    res.json({
      code: 200,
      msg: "更新成功",
      result: roleData,
    });
  } else {
    res.json({
      code: 400,
      msg: "参数错误",
    });
  }
  next();
});
// 删除角色
app.get("/role/delete", async (req, res, next) => {
  if (_.has(req.query, "ids") && _.isArray(req.query.ids)) {
    let origin = db_role.get("role").value();
    let current = origin.filter((item) => req.query.ids.indexOf(item.id) < 0);
    db_role.set("role", current).write();
    res.json({
      code: 200,
      msg: "删除成功!",
    });
  } else {
    res.json({
      code: 400,
      msg: "参数错误",
    });
  }
  next();
});
// 设置角色的菜单
app.get("/roleMenu/update", async (req, res, next) => {
  if (_.has(req.query, "checkedMenu", "halfCheckedMenu", "roleId")) {
    let { checkedMenu, halfCheckedMenu, roleId } = req.query;
    let target = db_role_menu.get("role_menu").find({ roleId }).value();
    if (target) {
      db_role_menu
        .get("role_menu")
        .find({ roleId })
        .assign({ checkedMenu, halfCheckedMenu })
        .write();
      res.json({
        code: 200,
        msg: "更新成功",
      });
    } else {
      db_role_menu
        .get("role_menu")
        .push({
          id: uuid(),
          roleId,
          checkedMenu,
          halfCheckedMenu,
        })
        .write();
      res.json({
        code: 200,
        msg: "新建成功",
      });
    }
  } else {
    res.json({
      code: 400,
      msg: "参数错误",
    });
  }
  next();
});
// 获取角色菜单
app.get("/roleMenu/query", async (req, res, next) => {
  if (_.has(req.query, "roleId")) {
    let { roleId } = req.query;
    console.log(roleId);
    let roleMenu = db_role_menu.get("role_menu").find({ roleId }).value();
    res.json({
      code: 200,
      msg: "ok",
      result: roleMenu || {},
    });
  }
  next();
});

// 查询用户
app.get("user/query", async (req, res, next) => {
  let result = db_user.get("user").value();
  res.json({
    code: 200,
    result,
  });
  next();
});
// 新增用户
app.get("user/add", async (req, res, next) => {
  if (
    _.has(
      req.query,
      "username",
      "phone",
      "email",
      "gender",
      "status",
      "roleId",
      "account",
      "desc"
    )
  ) {
    let { username, phone, email, gender, status, roleId, account, desc } =
      req.query;
    let uid = uuid();
    let createTime = Date.now();
    db_user
      .get("user")
      .push({
        uid,
        createTime,
        loginTime: -1,
        username,
        phone,
        email,
        gender,
        status,
        roleId,
        account,
        desc,
      })
      .write();
    res.json({
      code: 200,
      msg: "参数不合法",
      result: { uid, createTime },
    });
  } else {
    res.json({
      code: 400,
      msg: "参数不合法",
    });
  }
  next();
});

app.use((err, req, res, next) => {
  // 未经授权的错误
  if (err.name === "UnauthorizedError") {
    res.status(401).send({ msg: "不合法的请求" });
  }
  next();
});

const server = app.listen(8082, () => {
  const host = null; // server.address().address
  const port = server.address().port;
  // console.log("应用实例，访问地址为 http://%s:%s", 'localhost', port)
  console.log(`server running @ http://${host ? host : "localhost"}:${port}`);
});
