var express = require("express");
var axios = require("axios");
var ArtistsSearchResult = require("../src/modules/artistSearchResult");
const { getToken } = require("../src/middlewares/spotifyToken");
var router = express.Router();
var mongo = require("../src/db/mongooseDB");

router.post("/", [getToken], async function (req, res, next) {
  const access_token = req.body.spotToken;
  const name = req.body.searchText;
  const PageValue = req.body.PageValue;
  const api_url =
    "https://api.spotify.com/v1/search?q=" +
    name +
    "&type=artist&offset=" +
    PageValue +
    "&limit=5";

  try {
    mongo.open();
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
    console.log("GetArtistsError : ", error);
  }
});

router.get("/uniquesearches", async (req, res) => {
  const pagevalue = req.query.pagevalue;
  const searchText = req.query.searchText;
  const page = pagevalue;
  const startIndex = page * 5;
  console.log("req.query:", req.query);
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
      // {
      //   "$project": {
      //     "artists": {"a":"$artists"},
      //     "searches": "$searches",
      //     "artistsnb": {"$size": "$searchResult"}
      //   }
      // }
    ]);
    console.log("docs:", docs);
    docs[0].artists.map((ele) => {
      return console.log("ele: ", ele);
    });
    res.send(docs);
    // console.log("docs.searchResult:", docs[0].searchResult.map(ele => return cos));
    mongo.close();
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
