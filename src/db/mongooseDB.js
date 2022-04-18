const mongoose = require("mongoose");
const url = "mongodb://mongo:27017/task";

const mongoosedb = mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

module.exports = mongoosedb;
