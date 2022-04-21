const mongoose = require("mongoose");

const searchSchema = new mongoose.Schema({
  searchText: {
    type: String,
    required: true,
  },
  searchResult: {
    type: Array,
    required: true,
  },
});

module.exports = searchSchema;
