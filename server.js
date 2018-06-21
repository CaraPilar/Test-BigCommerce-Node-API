
var Connection = require('./connection');
require('dotenv').config();
//const app = require('http').createServer((req, res) => res.end(result));
const app = require('http');
const PORT = process.env.PORT || 3000;

// Initialize new API Connection:
var api = new Connection({
    hash:   process.env.HASH,
    token:  process.env.TOKEN,
    cid:    process.env.CLIENTID,
    host:   process.env.HOST //The BigCommerce API Host
  });
  
  //** Get the names of 10 products **//
  let result = '';
  api.get('/products?limit=10').then(function(products) {

    products.forEach(function(e, i) {
      result += (i + 1) + '. ' + products[i].name + '\n';
      //console.log(products[i].name);
    });
  }).catch(function(e) { // Catch any errors
    // NOTE: An error is thrown if BigCommerce returns a status other than 200 | 429
    result = 'Error on request - ' + e;
    //console.log('Error on request - ' +e);
  });

  //create server object
  app.createServer((req, res) =>{
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(result); //write response to client
    res.end();
  }).listen(PORT);

