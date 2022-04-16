var express = require("express");
const { getToken } = require("../src/middlewares/spotifyToken");
var router = express.Router();

/* GET home page. */
router.get("/", [getToken], function (req, res, next) {
  console.log("Token", req.body);
  console.log("Hello ?????????");
  res.send("initial route /");
});

module.exports = router;
