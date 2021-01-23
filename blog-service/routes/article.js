const express = require("express");
const router = express.Router();
const querySql = require("../db/index");

// 新增博客接口
router.post("/add", async (req, res, next) => {
  let { title, content } = req.body;
  let { userName } = req.user;
  try {
    const result = await querySql("select id from user where userName = ?", [
      userName,
    ]);
    const userId = result[0].id;
    await querySql(
      "insert into article(title,content,userId,createTime) values(?,?,?,NOW())",
      [title, content, userId]
    );
    res.send({
      code: 0,
      msg: "新增成功",
    });
  } catch (error) {
    next(error);
  }
});

// 获取全部博客列表接口
router.get("/allList", async (req, res, next) => {
  try {
    const result = await querySql(
      'select id,title,content,DATE_FORMAT(createTime,"%Y-%m-%d %H:%i:%s") AS createTime from article'
    );
    res.send({
      code: 0,
      msg: "success",
      data: result,
    });
  } catch (error) {
    next(error);
  }
});
// 获取我的博客列表
router.get("/myList", async (req, res, next) => {
  let { userName } = req.user;
  try {
    const userSql = "select id from user where userName = ?";
    const user = await querySql(userSql, [userName]);
    const userId = user[0].id;
    const blogSql =
      'select id,title,content,DATE_FORMAT(createTime,"%Y-%m-%d %H:%i:%s") AS createTime from article where userId = ?';
    const result = await querySql(blogSql, [userId]);
    res.send({
      code: 0,
      msg: "success",
      data: result,
    });
  } catch (error) {
    next(error);
  }
});
// 获取博客详情
router.get("/detail", async (req, res, next) => {
  const articleId = req.query.articleId;
  try {
    const blogSql =
      'select id,title,content,DATE_FORMAT(createTime,"%Y-%m-%d %H:%i:%s") AS createTime from article where id = ?';
    const result = await querySql(blogSql, [articleId]);
    res.send({
      code: 0,
      msg: "success",
      data: result[0],
    });
  } catch (error) {
    next(error);
  }
});
// 更新博客详情
router.post("/update", async (req, res, next) => {
  const { articleId, title, content } = req.body;
  const { userId } = req.user;
  try {
    const updateSql =
      "update article set title = ?,content = ? where id = ? and userId = ?";
    const result = await querySql(updateSql, [
      title,
      content,
      articleId,
      userId,
    ]);
    res.send({
      code: 0,
      msg: "success",
      data: result[0],
    });
  } catch (error) {
    next(error);
  }
});

// 删除博客详情
router.post("/delete", async (req, res, next) => {
  const { articleId } = req.body;
  const { userId } = req.user;
  try {
    const updateSql =
      "delete from article where id = ? and userId = ?";
    await querySql(updateSql, [
      articleId,
      userId,
    ]);
    res.send({
      code: 0,
      msg: "success",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
