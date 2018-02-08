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
router.use(function (req, res, next) {
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
       token = JSON.parse(body).access_token;
      //  console.log("token ="+token)
    next();

    })

})
router.get('/preview/:limit', function (req, res) {
  let limit = req.params.limit;
     var options = {
       url:'https://api.spotify.com/v1/browse/new-releases?limit='+limit+'&country=GB',

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
  router.get('/getAlbum/:id', function (req, res) {
    let id = req.params.id;
       var options = {
         url:'https://api.spotify.com/v1/albums/'+id,

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

      });

  router.get('/search/:query', function (req, res) {
     //console.log(token)
    let q = req.params.query;
    let query = encodeURIComponent(q)
       var options = {
         url:' https://api.spotify.com/v1/search?q='+query+'&type=album',

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

module.exports = router;
