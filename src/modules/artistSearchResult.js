const mongoose = require("mongoose");
const searchSchema = require("../schemas/SearchSchema");

const ArtistSearchResult = mongoose.model("artistSearchResult", searchSchema);

module.exports = ArtistSearchResult;
