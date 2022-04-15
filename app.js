var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

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
