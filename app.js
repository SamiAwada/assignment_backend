// var createError = require('http-errors');
var express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
var path = require("path");
// var cookieParser = require("cookie-parser");
// var logger = require("morgan");
var indexRouter = require("./routes/artists");

var app = express();
app.set("view engine", "html");


// view engine setup
app.use(cors("http://localhost:3000/"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/artists", indexRouter);

app.listen(3000, () => {
  console.log("server on port 3000");
});

module.exports = app;

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render("error");
// });
