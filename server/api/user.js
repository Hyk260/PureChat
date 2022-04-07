var {v4: uuid} = require('uuid');
var jwt = require("jsonwebtoken");
var lowdb = require("lowdb");
var FileSync = require("lowdb/adapters/FileSync");
const user = new FileSync("./db/user.json");
const db_user = lowdb(user); 
module.exports = {
  login: async (req, res, next) => {
    let { username, password } = req.query;
    if (username && password) {
      let user = db_user
        .get("user")
        .find({ username, password })
        .value();
      if (user) {
        res.setHeader("Access-Control-Expose-Headers", "x-token");
        res.setHeader("X-token", jwt.sign(user, SECRET_KEY));
        res.json({
          code: 200,
          msg: "登录成功!",
          result: user
        });
      } else {
        res.json({
          code: 401,
          msg: "账号或则密码不正确"
        });
      }
    } else {
      res.json({
        code: 400,
        msg: "不合法请求"
      });
    }
    next();
  }
};
