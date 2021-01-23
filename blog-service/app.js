var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
const expressJwt = require("express-jwt");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var articleRouter = require("./routes/article");
var commentRouter = require("./routes/comment");
const { PWD_SALT, PRIVEAYE_KEY, EXPIRESD } = require("./utils/constant");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  expressJwt({
    secret: PRIVEAYE_KEY,
    algorithms: ["HS256"],
  }).unless({
    path: [
      "/api/users/register",
      "/api/users/login",
      "/api/users/upload",
      "/api/article/allList",
      "/api/article/detail",
      "/api/comment/list",
    ], //白名单，除了这里写的地址之外 其他地方的url都需要验证
  })
);

app.use("/", indexRouter);
app.use("/api/users", usersRouter);
app.use("/api/article", articleRouter);
app.use("/api/comment", commentRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    // 这个需要根据⾃⼰的业务逻辑来处理
    res.status(401).send({ code: -1, msg: "token验证失败" });
  }
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
