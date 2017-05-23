var express = require('express');
var router = express.Router();
var request = require('request');
var md5 = require('js-md5');
var ts = Date.now();

var hash = md5.create();
require('dotenv').config()
//
var toHash = ts+process.env.COMICS_PRIVATE_APIKEY+process.env.COMICS_PUBLIC_APIKEY
//var toHash = ts+'309de8cec615438f84b237af18010e04b4b2c206'+'c9adedcaec1998d8444b26f475ebe174'
hash.update(toHash);

//
router.get('/preview', function (req, res) {
  var options = {
    url:'http://gateway.marvel.com/v1/public/comics?dateDescriptor=thisWeek&limit=4&ts='+ts+'&apikey='+process.env.COMICS_PUBLIC_APIKEY+'&hash='+hash.hex()
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
