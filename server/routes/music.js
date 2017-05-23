var express = require('express');
var router = express.Router();
var request = require('request');
var base64 = require('base-64');
require('dotenv').config();
var clientID = process.env.SPOTIFY_CLIENT_ID;
var clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
var h = clientID +':'+ clientSecret;
var credentials = base64.encode(h);
var token;
/*
Receives post from client side,
posts to request token, then uses token
to GET API endpoint
*/
router.post('/preview', function (req, res) {

  var options = {
    url:'https://accounts.spotify.com/api/token',
    form: {
     grant_type: 'client_credentials'
   },
    headers: {
      'Authorization': 'Basic '+ (new Buffer(clientID + ':' + clientSecret).toString('base64')),
    }
  }
   request.post(options, function (err, response, body) {

     if(err){
       return res.status(500).json({
         title: 'An error has occured',
         error: err
       })
     }
     //second call
        token = JSON.parse(body).access_token;
     var options = {
       url:'https://api.spotify.com/v1/browse/new-releases?limit=4&country=GB',

       headers: {
         'Authorization': 'Bearer '+token,
       }
     }
      request.get(options, function (err, response, body) {

        if(err){
          return res.status(500).json({
            title: 'An error has occured',
            error: err
          })
        }
           res.json({data: JSON.parse(body)});
       })

    })

})
module.exports = router;
