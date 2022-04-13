var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("Hello ?????????");
  res.send("initial route /");
});

module.exports = router;
