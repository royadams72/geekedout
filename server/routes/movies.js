var express = require('express');
var router = express.Router();
var request = require('request');
// var LocalStorage = require('node-localstorage').LocalStorage,
// localStorage = new LocalStorage('./scratch');
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

router.get('/preview/:pageNum', function (req, res, next) {
  let pageNum = req.params.pageNum;

  var options = {
    url:'https://api.themoviedb.org/3/movie/now_playing?api_key='+process.env.MOVIES_APIKEY+'&language=en-GB&page='+pageNum+'&egion=GB'
  }

   request(options, function (err, response, body) {

     if(err){
       return res.status(500).json({
         title: 'An error has occured',
         error: err
       })
     }
        res.json({data: JSON.parse(body)});
        next();
    })

});

router.get('/details/:id', function (req, res) {
  let id = req.params.id;
  var options = {
    url:'https://api.themoviedb.org/3/movie/'+id+'?api_key='+process.env.MOVIES_APIKEY+'&language=en-GB&egion=GB'
  }

   request(options, function (err, response, body) {
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
  let q = req.params.query;
  let query = encodeURIComponent(q)
  var options = {
    url:'https://api.themoviedb.org/3/search/movie?api_key='+process.env.MOVIES_APIKEY+'&query='+query+'&language=en-GB&egion=GB&include_adult=true'
    //search/multi?api_key=<<api_key>>&language=en-US&page=1&include_adult=false
  }

   request(options, function (err, response, body) {
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
