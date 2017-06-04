var express = require('express');
var router = express.Router();
var request = require('request');
var md5 = require('js-md5');
var ts = Date.now();
var cc = require('currency-converter')({ CLIENTKEY: process.env.OPEN_EXCHANGE_RATES_API, fetchInterval: 3600000 })
var fx = require('money');
var API = require('currency-conversion');
var api = new API({
	access_key: '2ef8cd780da14cd0febc637342fca35b',
	secure: false
});
const converter = require('google-currency')
var hash = md5.create();
require('dotenv').config()
//
var toHash = ts+process.env.COMICS_PRIVATE_APIKEY+process.env.COMICS_PUBLIC_APIKEY

hash.update(toHash);

//
router.get('/preview/:limit', function (req, res, next) {
  let limit = req.params.limit;
  //console.log(req.params.limit)
  var options = {
    url:'http://gateway.marvel.com/v1/public/comics?dateDescriptor=thisWeek&limit='+limit+'&ts='+ts+'&apikey='+process.env.COMICS_PUBLIC_APIKEY+'&hash='+hash.hex()
  }

   request(options, function (err, response, body) {

     if(err){
       return res.status(500).json({
         title: 'An error has occured',
         error: err
       })
     }
          res.json({data: JSON.parse(body)});
        //  next();
    })

});
function findAndReplace(object, value, replacevalue) {
  //console.log(replacevalue)
  for (var x in object) {
    if (object.hasOwnProperty(x)) {
      if (typeof object[x] == 'object') {
        findAndReplace(object[x], value, replacevalue);
      }
      if (object[x] == value) {
        object["name"] = replacevalue;
         break; // uncomment to stop after first replacement

      }
    }
  }
}
router.get('/details/:id', function (req, res, next) {
  let id = req.params.id;
  //console.log(req.params.id)
  var options = {
    url:'http://gateway.marvel.com/v1/public/comics/'+id+'?ts='+ts+'&apikey='+process.env.COMICS_PUBLIC_APIKEY+'&hash='+hash.hex()
  }

   request(options, function (err, response, body) {

     if(err){
       return res.status(500).json({
         title: 'An error has occured',
         error: err
       })
     }
     var amount =  JSON.parse(body).data.results[0].prices[0].price

     var options = {
       from: "USD",
       to: "GBP",
       amount: JSON.parse(body).data.results[0].prices[0].price
     }
     return converter(options).then(value => {


          res.json({data: JSON.parse(body), ukprice: value.converted});
     })

    //  JSON.parse(body).data.results[0].prices[0].price =  convertCurrency(amount);
     //console.log(JSON.parse(body).data.results[0].prices[0].price)


    })

})


      /*? access_key = YOUR_ACCESS_KEY
      & from = USD
      & to = GBP
      & amount = 10  */
      // JSON.parse(body).data.results[0].prices[0].price = amount;

module.exports = router;
