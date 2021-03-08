require("dotenv").config();
require("dotenv-safe").config();
var https = require('follow-redirects').https;
var fs = require('fs');

const crypto = require('crypto');

const query_string = 'timestamp='+Date.now();
const apiSecret = process.env.APISECRET;
const apiKey = process.env.APIKEY;
console.info('APISECRET ',apiSecret);

function signature(query_string) {
    return crypto
        .createHmac('sha256', apiSecret)
        .update(query_string)
        .digest('hex');
}
console.info('Signature: ',signature(query_string));

var options = {
  'method': 'GET',
  'hostname': 'api.binance.com',
  'path': '/sapi/v1/margin/account?timestamp='+Date.now()+'&signature='+signature(query_string),
  'headers': {
    'Content-Type': 'application/json',
    'X-MBX-APIKEY': apiKey
  },
  'maxRedirects': 20
};
console.info('Options: ',options);
var req = https.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function (chunk) {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });

  res.on("error", function (error) {
    console.error(error);
  });
});

req.end();