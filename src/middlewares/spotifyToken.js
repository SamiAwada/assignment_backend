var axios = require("axios");
var qs = require("qs");
const Redis = require("ioredis");
require("dotenv").config();

module.exports = {
  getToken: async function (req, res, next) {
    const redis = new Redis(6379, "redis-cache");
    const redisToken = await redis.get("redisToken", (err, result) => {
      if (err) {
        return err;
      } else {
        return result;
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
        const token_url = process.env.AUTH_SPOTIFY_URL;
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
            req.body.spotToken = response.data.access_token;
            next();
          })
          .catch((error) => {
            req.body.error_msg = "no access token generated from spotify ";
            next();
          });
      } catch (error) {
        req.body.error_msg = "No Access For Spotify URL ";
        next();
      }
    } else {
      req.body.spotToken = redisToken;
      next();
    }
  },
};
