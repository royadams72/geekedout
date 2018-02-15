var express = require('express');
var router = express.Router();
var request = require('request');
var md5 = require('js-md5');
var ts = Date.now();
const convertCurrency = require('nodejs-currency-converter');

var hash = md5.create();
require('dotenv').config()
//
var toHash = ts+process.env.COMICS_PRIVATE_APIKEY+process.env.COMICS_PUBLIC_APIKEY

hash.update(toHash);

//
router.get('/preview/:limit/:offset', function (req, res, next) {
  let limit = req.params.limit;
	let offset = req.params.offset;

  var options = {
    url:'http://gateway.marvel.com/v1/public/comics?dateDescriptor=thisWeek&offset='+offset+'&limit='+limit+'&ts='+ts+'&apikey='+process.env.COMICS_PUBLIC_APIKEY+'&hash='+hash.hex()
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

     var amount =  JSON.parse(body).data.results[0].prices[0].price;

		 convertCurrency(amount, 'USD', 'GBP').then(response =>{
			 console.log(response)
			   res.json({data: JSON.parse(body), ukprice: response.convertedValue});
		 })
		 .catch(err => console.log(err));

    })

})

router.get('/search/:query', function (req, res, next) {
	let q = req.params.query;
	let str = q.slice(0, 5)
	let query = encodeURIComponent(str)

  // console.log("comics "+query)
  var options = {
    url:'http://gateway.marvel.com/v1/public/comics?titleStartsWith='+query+'&ts='+ts+'&apikey='+process.env.COMICS_PUBLIC_APIKEY+'&hash='+hash.hex()
  }

   request(options, function (err, response, body) {

     if(err){
       return res.status(500).json({
         title: 'An error has occured',
         error: err
       })
     }
		 // console.log(body)
		   res.json({data: JSON.parse(body)});

    })

})


module.exports = router;
