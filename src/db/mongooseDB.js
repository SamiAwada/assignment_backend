const mongoose = require("mongoose");
const url = process.env.MONGO_URL;

let mongo = {
  db: null,
  open: () =>
    mongoose.connect(url, {
      user: "root",
      pass: "MYROOTPASS",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
  close: () => {
    mongoose.connection.close();
  },
};

module.exports = mongo;
