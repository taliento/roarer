const express = require("express");
const bodyParser = require("body-parser");
// const mongodb = require("mongodb");
// const ObjectID = mongodb.ObjectID;
const cors = require("cors");
const path = require("path");
const Twitter = require("twitter");

const app = express();
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// Create link to vue build directory
const distDir = __dirname + "/view/dist/spa-mat";
app.use(express.static(distDir));

var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  bearer_token: process.env.TWITTER_BEARER_TOKEN
});

/*
*  curl -X GET 'http://localhost:3000/search/riace'| jq
*/
app.get("/search/:query", function(req, res) {
  const params = {
    q: req.params.query,
    tweet_mode: "extended",
    include_entities: false,
    locale: 'it'
  };
  client.get("search/tweets", params,
    function(error, tweets, response) { //, count:1
      if(error) {
        console.log(error);
        res.status(500).send(error);
      } else {
        res.send(tweets);
      }
   });
});

// Initialize the app.
var server = app.listen(process.env.PORT || 3000, function() {
  var port = server.address().port;
  console.log("App now running on port", port);
});
