var express = require("express");
var axios = require("axios");
const { getToken } = require("../src/middlewares/spotifyToken");
var router = express.Router();

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
    console.log(searchResult);
    res.send(searchResult);
  } catch (error) {
    console.log("GetArtistsError : ", error);
  }
});

module.exports = router;
