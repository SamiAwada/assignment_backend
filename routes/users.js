var express = require('express');
var router = express.Router();

const MongoClient = require("mongodb").MongoClient;
const mongoose = require("mongoose");
const url = "mongodb://mongo:27017/assignment";

/* GET users listing. */
router.get("/", function (req, res, next) {
  mongoose.connect(url, { useNewUrlParser: true });
  console.log("request start");

  const db = mongoose.connection;
  db.once("open", (_) => {
    console.log("Database connected:", url);
  });

  db.on("error", (err) => {
    console.error("connection error:", err);
  });
  db.close(false, () => {
    console.log("Database closed:");
  });
  console.log("before response");

  res.send("respond with a resource");
});

module.exports = router;
