const mongoose = require("mongoose");
const url = "mongodb://mongo:27017/assignment";

const mongoosedb = mongoose.connect(url, { useNewUrlParser: true });

module.exports = mongoosedb;
