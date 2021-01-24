var express = require("express");
var router = express.Router();
const querySql = require("../db/index");

// 发表评论接口
router.post("/publish", async (req, res, next) => {
  const { content, articleId } = req.body;
  const { userId } = req.user;
  try {
    const userSql = "select id,headImg,nickName from user where id = ?";
    const users = await querySql(userSql, [userId]);
    const { id, headImg, nickName } = users[0];
    const commentSql =
      "insert into comment(content, articleId, userId, headImg, nickName, createTime) values(?, ?, ?, ?, ?, NOW())";
    await querySql(commentSql, [
      content,
      articleId,
      id,
      headImg,
      nickName,
    ]);
    res.send({
      code: 0,
      msg: "发表成功",
    });
  } catch (error) {
    next(error);
  }
});

// 评论接口
router.get("/list", async (req, res, next) => {
    const { articleId } = req.query;
    try {
      const listSql = "select * from comment where articleId = ? order by createTime desc";
      const list = await querySql(listSql, [articleId]);
      res.send({
        code: 0,
        msg: "success",
        list: list,
      });
    } catch (error) {
      next(error);
    }
  });

module.exports = router;
