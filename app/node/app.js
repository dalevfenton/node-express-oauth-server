var express = require('express');
var request = require('request');
var app = express();
var cors = require('cors');

app.use(cors()); //allows overriding cross origin policy (use npm install if needed)


app.get('/api', function(req, res){ // listens for request on /api route
  // var lat = req.query.lat; // grabs lat and lng queries from the request object
  // var lng = req.query.lng;
  var code = req.query.token;
  var client_id = process.env.CLIENT_ID;
  var client_secret = process.env.CLIENT_SECRET;
  request('https://github.com/login/oauth/access_token?client_id=' + client_id + '&client_secret=' + client_secret + '&code=' + code + '&hasImages=Y&key=72a751214ab8b53056ac0a6d8376dc2d', function (error, response, body) { // api url
    if (!error && response.statusCode === 200) {
      console.log('');
      res.send(body); // if no errors, send the body of data back to front end
    }
   });
});

var port = process.env.PORT || 3000;
app.listen(port);
console.log('Server running on port %d');
