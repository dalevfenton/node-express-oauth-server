var express = require('express');
var request = require('request');
var Yelp = require('yelp');
var app = express();
var cors = require('cors');

app.use(cors()); //allows overriding cross origin policy (use npm install if needed)


app.get('/api/gasfeed', function(req, res){
  var key = process.env.GASFEED_API || 'o09ii81rr5';
  var endpoint, options;
  if(req.query.options){
    options = JSON.parse(req.query.options);
  }
  endpoint = 'http://api.mygasfeed.com/' + req.query.endpoint +  key + '.json';
  request( endpoint,
    function (error, response, body) { // api url
      if (!error && response.statusCode === 200) {
        res.send(body); // if no errors, send the body of data back to front end
      }
      if(error){
        res.send(error, response, body);
      }
   });
});

app.get('/api/yelp', function(req, res){
  var ckey = process.env.YELP_CONSUMER_KEY || 'dl6yJ0IjtSbF2i4VcQAyJg';
  var csecret = process.env.YELP_CONSUMER_SECRET || 'LyKDEwmpIzq7aCbqChMtvDsh3TE';
  var token = process.env.YELP_TOKEN || 'PwtCgTe9HjOvXnmtnso-pRr8impN_Qxu';
  var token_secret = process.env.YELP_TOKEN_SECRET || 'tXy1U-oNYvwUcfS--JyLNfo_Rg8';

  var yelp = new Yelp({
    consumer_key: ckey,
    consumer_secret: csecret,
    token: token,
    token_secret: token_secret,
  });
  yelp.search(req.query).then(function(data){
    res.send(data);
  }).catch(function(err){
    console.error(err);
  });
});
var port = process.env.PORT || 3000;
app.listen(port);

console.log('server running on port: ', port);
