var express = require('express');
var router = express.Router();
var request = require('request');
var dateFormat = require('dateformat');
var date = dateFormat('yyyy-mm-dd');
var async = require('async');
require('dotenv').config();
// objName: 'player_perspectives' objName: ''
var objName = ['genres', 'player_perspectives', 'game_modes', 'themes'];
router.get('/getfields', function (req, res, next) {
  // create request objects to loop through
  var requests = [{
    url:'https://igdbcom-internet-game-database-v1.p.mashape.com/genres/?fields=name,id',
    headers: {
      'X-Mashape-Key': process.env.X_MASHAPE_KEY,
      'Accept': 'application/json'
    }
  },{
      url:'https://igdbcom-internet-game-database-v1.p.mashape.com/player_perspectives/?fields=name',
      headers: {
        'X-Mashape-Key': process.env.X_MASHAPE_KEY,
        'Accept': 'application/json'
      }
    },{
        url:'https://igdbcom-internet-game-database-v1.p.mashape.com/game_modes/?fields=name',
        headers: {
          'X-Mashape-Key': process.env.X_MASHAPE_KEY,
          'Accept': 'application/json'
        }
      },
      {
          url:'https://igdbcom-internet-game-database-v1.p.mashape.com/themes/?fields=name',
          headers: {
            'X-Mashape-Key': process.env.X_MASHAPE_KEY,
            'Accept': 'application/json'
          }
        }];

async.map(requests, function(obj, callback) {
    // iterator function
    request(obj, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        // transform data here or pass it on
        // {data: JSON.parse(body)}

        var body = JSON.parse(body);

        callback(null, body);
      } else {
        callback(error || response.statusCode);
      }
    });
  }, function(err, results) {
    // all requests have been made
    if (err) {
      console.log(err)
      // handle your error
    } else {
      //console.log(results.length);
      // res.json(results);
      var f = []
      for (var i = 0; i < results.length; i++) {

        // request body is results[i]
        var newObj = {data: results[i]}
         var val = newObj.data;
         newObj[objName[i]] = val;

        delete newObj.data;
      console.log(newObj)
        f.push(newObj)
      }
      res.json(f);
    }
  });
// next();
})


router.get('/preview/:limit', function (req, res) {
  let limit = req.params.limit;
  var options = {
    url:'https://igdbcom-internet-game-database-v1.p.mashape.com/games/?fields=*&order=popularity:desc&filter[release_dates.date][gte]='+date+'&limit='+limit,
    headers: {
      'X-Mashape-Key': process.env.X_MASHAPE_KEY,
      'Accept': 'application/json'
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

router.get('/getgame/:id', function (req, res) {
  let id = req.params.id;
  var options = {
    url:'https://igdbcom-internet-game-database-v1.p.mashape.com/games/'+id+'?fields=*',
    headers: {
      'X-Mashape-Key': process.env.X_MASHAPE_KEY,
      'Accept': 'application/json'
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
  let q = req.params.query;
  let query = encodeURIComponent(q)
  
  var options = {
    url:'https://igdbcom-internet-game-database-v1.p.mashape.com/games/?search='+query+'&fields=*',
    headers: {
      'X-Mashape-Key': process.env.X_MASHAPE_KEY,
      'Accept': 'application/json'
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
