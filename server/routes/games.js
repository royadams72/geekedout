var express = require('express');
var router = express.Router();
var request = require('request');
var dateFormat = require('dateformat');
var date = dateFormat('yyyy-mm-dd')
require('dotenv').config()

router.get('/preview', function (req, res) {
  var options = {
    url:'https://igdbcom-internet-game-database-v1.p.mashape.com/games/?fields=*&order=popularity:desc&filter[release_dates.date][gte]='+date+'&limit=4',
    headers: {
      'X-Mashape-Key': process.env.X_MASHAPE_KEY,
      'Accept': 'application/json'
    }
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
