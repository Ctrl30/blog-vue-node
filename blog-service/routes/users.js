var express = require("express");
var router = express.Router();
const querySql = require("../db/index");
const { PWD_SALT, PRIVEAYE_KEY, EXPIRESD } = require("../utils/constant");
const { md5, upload } = require("../utils/index");
const jwt = require("jsonwebtoken");

/* 注册接口 */
router.post("/register", async (req, res, next) => {
  let { userName, passWord, nickName } = req.body;
  try {
    let user = await querySql("select * from user where userName = ?", [
      userName,
    ]);
    if (!user || user.length === 0) {
      passWord = md5(`${passWord}${PWD_SALT}`);
      await querySql(
        "insert into user(userName, passWord,nickName) value(?,?,?)",
        [userName, passWord, nickName]
      );
      res.send({ code: 0, msg: "success" });
    } else {
      res.send({
        code: -1,
        msg: "该账号已注册",
      });
    }
  } catch (error) {
    next(error);
  }
});

// 登录接口
router.post("/login", async (req, res, next) => {
  let { userName, passWord } = req.body;
  try {
    let user = await querySql("select * from user where userName = ?", [
      userName,
    ]);
    if (!user || user.length === 0) {
      res.send({
        code: -1,
        msg: "该账号不存在",
      });
    } else {
      passWord = md5(`${passWord}${PWD_SALT}`);
      const result = await querySql(
        "select * from user where userName = ? and passWord = ?",
        [userName, passWord]
      );
      if (!result || result.length === 0) {
        res.send({ code: -1, msg: "账号或者密码不正确" });
      } else {
        // 生成token
        let token = jwt.sign({ userName: userName,userId:result[0].id }, PRIVEAYE_KEY, {
          expiresIn: EXPIRESD,
        });
        res.send({ code: 0, msg: "登录成功", token });
      }
    }
  } catch (error) {
    next(error);
  }
});

// 用户信息
router.get("/info", async (req, res, next) => {
  let { userName } = req.user;
  try {
    let userInfo = await querySql(
      "select nickName,headImg from user where userName = ?",
      [userName]
    );
    res.send({ code: 0, data: userInfo[0] });
  } catch (error) {
    next(error);
  }
});

// 头像上传接口
router.post("/upload", upload.single("headImg"), async (req, res, next) => {
  try {
  let imgPath = req.file.path.split("public")[1];
  let imgUrl = "http://106.52.102.92:3000" + imgPath;
  res.send({
    code: 0,
    msg: "上传成功",
    data: {
      imgUrl,
    },
  });
  } catch (error) {
    next(error);
  }
});
// 用户信息更新接口
router.post("/updateUser", async (req, res, next) => {
  let { nickName, headImg } = req.body;
  const { userName } = req.user;
  try {
    let result = await querySql('update user set nickName = ?,headImg = ? where userName = ?', [nickName,headImg,userName]);
    res.send({ code: 0, msg: '更新成功', data:result[0] })
  } catch (error) {
    next(error);
  }
});

module.exports = router;
