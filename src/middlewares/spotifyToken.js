var axios = require("axios");
var qs = require("qs");
require("dotenv").config();

module.exports = {
  getToken: function (req, res, next) {
    const client_id = process.env.SPOTIFY_API_ID; // Your client id
    const client_secret = process.env.SPOTIFY_CLIENT_SECRET; // Your secret
    const auth_token = Buffer.from(
      `${client_id}:${client_secret}`,
      "utf-8"
    ).toString("base64");
    try {
      //make post request to SPOTIFY API for access token, sending relavent info
      const token_url = "https://accounts.spotify.com/api/token";
      const data = qs.stringify({ grant_type: "client_credentials" });

      const response = axios
        .post(token_url, data, {
          headers: {
            Authorization: `Basic ${auth_token}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
        .then((response) => {
          console.log("Token :", response.data.access_token);
          req.body.spotToken = response.data.access_token;
          next();
        })
        .catch((error) => {
          console.log(error);
        });
      //return access token
      //console.log(response.data.access_token);
    } catch (error) {
      //on fail, log the error in console
      console.log("ERROR-AUTH", error);
    }
  },
};
