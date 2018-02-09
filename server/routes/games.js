var express = require('express');
var router = express.Router();
var request = require('request');
var dateFormat = require('dateformat');
var date = dateFormat('yyyy-mm-dd');
var async = require('async');
const URL = "https://api-2445582011268.apicast.io/"
require('dotenv').config();
// objName: 'player_perspectives' objName: ''
var objName = ['genres', 'player_perspectives', 'game_modes', 'themes'];
router.get('/getfields', function(req, res, next) {
  // create request objects to loop through
  var requests = [{
      url: URL+'genres/?fields=name,id',
      headers: {
        'user-key': process.env.IGDB_APIKEY,
        'Accept': 'application/json'
      }
    }, {
      url: URL+'player_perspectives/?fields=name',
      headers: {
        'user-key': process.env.IGDB_APIKEY,
        'Accept': 'application/json'
      }
    }, {
      url: URL+'game_modes/?fields=name',
      headers: {
        'user-key': process.env.IGDB_APIKEY,
        'Accept': 'application/json'
      }
    },
    {
      url: URL+'themes/?fields=name',
      headers: {
        'user-key': process.env.IGDB_APIKEY,
        'Accept': 'application/json'
      }
    }
  ];

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
        var newObj = {
          data: results[i]
        }
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


router.get('/preview/:limit', function(req, res) {
  let limit = req.params.limit;
  var options = {
    url: URL+'games/?fields=*&order=popularity:desc&filter[release_dates.date][gte]=' + date + '&limit=' + limit,
    headers: {
      'user-key': process.env.IGDB_APIKEY,
      'Accept': 'application/json'
    }
  }

  request.get(options, function(err, response, body) {

    if (err) {
      return res.status(500).json({
        title: 'An error has occured',
        error: err
      })
    }
    res.json({
      data: JSON.parse(body)
    });

  })

})

router.get('/getgame/:id', function(req, res) {
  let id = req.params.id;
  var options = {
    url: URL+'games/' + id + '?fields=*',
    headers: {
      'user-key': process.env.IGDB_APIKEY,
      'Accept': 'application/json'
    }
  }

  request.get(options, function(err, response, body) {

    if (err) {
      return res.status(500).json({
        title: 'An error has occured',
        error: err
      })
    }
    res.json({
      data: JSON.parse(body)
    });
  })
});

router.get('/search/:query', function(req, res) {
  let q = req.params.query;
  let limit = req.params.limit;
  let query = encodeURIComponent(q)

  var options = {
    url: URL+'games/?search=' + query + '&fields=*',
    headers: {
      'user-key': process.env.IGDB_APIKEY,
      'Accept': 'application/json'
    }
  }

  request.get(options, function(err, response, body) {
    if (err) {
      return res.status(500).json({
        title: 'An error has occured',
        error: err
      })
    }
    res.json({
      data: JSON.parse(body)
    });
  })
})
module.exports = router;
