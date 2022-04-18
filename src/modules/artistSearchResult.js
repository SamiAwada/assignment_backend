const mongoose = require("mongoose");

const ArtistSearchResult = mongoose.model("artistSearchResult", {
  searchText: {
    type: String,
    required: true,
  },
  searchResult: {
    type: Array,
    required: true,
  },
});

module.exports = ArtistSearchResult;
