var axios = require("axios");
var qs = require("qs");
const Redis = require("ioredis");
require("dotenv").config();

module.exports = {
  getToken: async function (req, res, next) {
    const redis = new Redis(6379, "redis-cache");
    const redisToken = await redis.get("redisToken", (err, result) => {
      if (err) {
        console.error(err);
      } else {
        return result; // Prints "value"
      }
    });

    if (redisToken === null) {
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
            redis.set("redisToken", "" + response.data.access_token);
            redis.expire("redisToken", 20);
            console.log("generatedToken:", response.data.access_token);
            req.body.spotToken = response.data.access_token;
            next();
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        //on fail, log the error in console
        console.log("ERROR-AUTH", error);
      }
    } else {
      console.log("cachedToken:", redisToken);
      req.body.spotToken = redisToken;
      next();
    }
  },
};
