var express = require('express');
var router = express.Router();


/* GET users listing. */
router.get("/", function (req, res, next) {
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
