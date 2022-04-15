var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
app.set("view engine", "html");
// var axios = require("axios");
// var qs = require("qs");
// require("dotenv").config();
// // Client ID 4d1a89c59c9c493a870c646af5bde69d
// // Client Secret 6294aabd768f4ab087ba2d16ae85d6fd

// const client_id = process.env.SPOTIFY_API_ID; // Your client id
// const client_secret = process.env.SPOTIFY_CLIENT_SECRET; // Your secret
// const auth_token = Buffer.from(
//   `${client_id}:${client_secret}`,
//   "utf-8"
// ).toString("base64");

// const getAuth = async () => {
//   try {
//     //make post request to SPOTIFY API for access token, sending relavent info
//     const token_url = "https://accounts.spotify.com/api/token";
//     const data = qs.stringify({ grant_type: "client_credentials" });

//     const response = await axios.post(token_url, data, {
//       headers: {
//         Authorization: `Basic ${auth_token}`,
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//     });
//     //return access token
//     return response.data.access_token;
//     //console.log(response.data.access_token);
//   } catch (error) {
//     //on fail, log the error in console
//     console.log("ERROR-AUTH", error);
//   }
// };

// const getAudioFeatures_Track = async (track_id) => {
//   //request token using getAuth() function
//   const access_token = await getAuth();
//   console.log(access_token);

//   const api_url = `https://api.spotify.com/v1/search?q=Bak&type=artist&limit=10`;
//   // console.log(api_url);
//   try {
//     const response = await axios.get(api_url, {
//       headers: {
//         Authorization: `Bearer ${access_token}`,
//         "Content-Type": "application/json",
//       },
//     });
//     console.log(response.data.artists.items);
//     return response.data;
//   } catch (error) {
//     console.log("GetArtistsError : ", error);
//   }
// };

// console.log(getAudioFeatures_Track("07A0whlnYwfWfLQy4qh3Tq"));

// view engine setup 

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(3000, () => {
  console.log("server on port 3000");
});

module.exports = app;
