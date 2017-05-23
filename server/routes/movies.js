var express = require('express');
var router = express.Router();
var request = require('request');

require('dotenv').config()

router.get('/info', function (req, res) {
  var options = {
    url:'https://api.themoviedb.org/3/configuration?api_key='+process.env.MOVIES_APIKEY+'&language=en-GB&limit=4&egion=GB'
  }

   request(options, function (err, response, body) {

     if(err){
       return res.status(500).json({
         title: 'An error has occured',
         error: err
       })
     }
  //  console.log(process.env.MOVIES_APIKEY)
          res.json({data: JSON.parse(body)});
    })

})

router.get('/preview', function (req, res) {
  var options = {
    url:'https://api.themoviedb.org/3/movie/now_playing?api_key='+process.env.MOVIES_APIKEY+'&language=en-GB&limit=4&egion=GB'
  }

   request(options, function (err, response, body) {

     if(err){
       return res.status(500).json({
         title: 'An error has occured',
         error: err
       })
     }
  //  console.log(process.env.MOVIES_APIKEY)
          res.json({data: JSON.parse(body)});
    })

})
module.exports = router;
