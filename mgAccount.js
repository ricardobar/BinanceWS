//index.js
require("dotenv").config();
require("dotenv-safe").config();
//const prompt = require('prompt-sync')({sigint: true});
//const iscoin = prompt('Entre com a Moeda a base: (USD,BRL,EUR) ');
//const asset = prompt('Entre com a Moeda a transferir: (BTC,USDT,BUSD,ETH) ');

//var APIKEY = '83DSFBNN02mKWPSxBcISoCb5u9abAZ4HQ0mxBOeO7Pte1flDYeYuE9qFxEwZWNwR';
//var APISECRET = 'ewG8drPEeysTR6u3DSBCArdJOwDVYqPd566dMYb6KmN6wiM4cA7CuofVG8QrKp9q';

const { time } = require("console");
//Estancia o objeto
const Binance = require('node-binance-api');

//Popula as variaveis
 const binance = new Binance().options({
  APIKEY: process.env.APIKEY,
  APISECRET: process.env.APISECRET,
  useServerTime: true,
  recvWindow: 60000, // Set a higher recvWindow to increase response timeout
  verbose: true, // Add extra output when subscribing to WebSockets, etc
  log: log => {
  console.log(log); // You can create your own logger here, or disable console output
  }
});



//var datetime = new Date();
//console.log(datetime);

//setInterval(async () => {
  //binance.mgAllOrders("ADAUSDT", (error, orders, symbol) => {
  //  console.info(symbol+" orders:", orders);
  //binance.account((error, response) => {
  binance.mgAccount((error, response) => {
    if ( error ) return console.warn(error);
    //console.info("Account details response:", response);
    //console.info("Hora: ", Date());

    console.info("Margin Level: ", response.marginLevel);
    console.info("totalAssetOfBtc: ", response.totalAssetOfBtc);
    console.info("totalLiabilityOfBtc: ", response.totalLiabilityOfBtc);
    console.info("totalNetAssetOfBtc: ", response.totalNetAssetOfBtc);
    console.info("tradeEnabled: ", response.tradeEnabled);
    console.info("Total Assets: ", Object.keys(response.userAssets).length);
    for (i in response.userAssets) {
      if (response.userAssets[i].free > 0) {
      console.info("Asset:",response.userAssets[i].asset);
      console.info("Free:",response.userAssets[i].free);
      console.info("Locked:",response.userAssets[i].locked);
      console.info("Borrowed:",response.userAssets[i].borrowed);
      console.info("Interest:",response.userAssets[i].interest);
      console.info("netAsset:",response.userAssets[i].netAsset);
      }
    };
    //console.info("-----------------------------------------");
    //console.info("Account details response:", response);
  });

    //console.info('ServerTime:', binance.useServerTime());
  //console.info("Binance: ", binance);
//},
//process.env.CRAWLER_INTERVAL
//)

/*binance.maxTransferable(asset, (error, response) => {
  if ( error ) return console.warn(error);
  console.info(`Maximum transfer-out amount: ${response.amount}`);
});*/


/*tradeEnabled: false,
  transferEnabled: true,
  borrowEnabled: false,
  marginLevel: '999',
  totalAssetOfBtc: '0',
  totalLiabilityOfBtc: '0',
  totalNetAssetOfBtc: '0',*/