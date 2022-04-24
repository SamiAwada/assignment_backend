var express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
var path = require("path");
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
