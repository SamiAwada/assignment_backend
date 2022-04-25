var express = require("express");
var axios = require("axios");
var ArtistsSearchResult = require("../src/modules/artistSearchResult");
const { getToken } = require("../src/middlewares/spotifyToken");
var router = express.Router();
var mongo = require("../src/db/mongooseDB");

router.get("/", [getToken], async function (req, res, next) {
  const access_token = req.body.spotToken;
  const name = req.query.searchText;
  const PageValue = req.query.PageValue;
  const api_url =
    "https://api.spotify.com/v1/search?q=" +
    name +
    "&type=artist&offset=" +
    PageValue +
    "&limit=5";
  if (access_token) {
    try {
      await mongo.open();
      const response = await axios.get(api_url, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      });
      const searchResult = {
        total: response.data.artists.total,
        artists: response.data.artists.items.map((artist, i) => {
          return {
            name: artist.name,
            followers: artist.followers.total,
            type: artist.type,
            artistURL: artist.href,
          };
        }),
      };

      const searchResultDB = new ArtistsSearchResult({
        searchText: name,
        searchResult: searchResult.artists,
      });
      await searchResultDB.save();
      mongo.close();
      res.send(searchResult);
    } catch (error) {
      res.send({ error_msg: "Something Went Wrong!", error: error });
    }
  } else {
    res.send({ error_msg: "Something Went Wrong!", error: req.body.error_msg });
  }
});

router.get("/uniquesearches", async (req, res) => {
  let db;
  const pagevalue = req.query.pagevalue;
  const searchText = req.query.searchText;
  const page = pagevalue;
  const startIndex = page * 5;
  try {
    await mongo.open();
    let docs = await ArtistsSearchResult.aggregate([
      { "$match": { "searchText": { "$regex": searchText } } },
      { "$unwind": "$searchResult" },
      {
        "$group": {
          "_id": "null",
          "searches": { "$addToSet": "$searchText" },
          "searchResult": { "$addToSet": "$searchResult" },
        },
      },
      {
        "$project": {
          "artists": { "$slice": ["$searchResult", startIndex, 5] },
          "searches": "$searches",
          "artistsnb": { "$size": "$searchResult" },
        },
      },
    ]);
    if (docs.length !== 0) res.send(docs);
    else res.send("no history found for your search");
    mongo.close();
  } catch (error) {
    res.send({ error_msg: "Something Went Wrong!" });
  }
});

router.get("/searches", async (req, res) => {
  try {
    await mongo.open();
    let docs = await ArtistsSearchResult.aggregate([
      {
        "$group": {
          "_id": "null",
          "searches": { "$addToSet": "$searchText" },
        },
      },
    ]);
    res.send(docs[0].searches);
    mongo.close();
  } catch (error) {
    res.send({ error_msg: "Something Went Wrong!" });
  }
});

module.exports = router;
