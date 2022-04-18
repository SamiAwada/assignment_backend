const mongoose = require("mongoose");
const url = "mongodb://root:MYROOTPASS@mongo:27017/task?authSource=admin";

// const mongoosedb = mongoose.connect(url, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
let mongo = {
  db: null,
  open: async () => {
    mongo.db = await mongoose.connect(url, {
      user: "root",
      pass: "MYROOTPASS",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  },
  close: () => {
    mongoose.connection.close();
  },
};

module.exports = mongo;
