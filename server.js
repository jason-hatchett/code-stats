(function() {
  var app, express, http, esprimaStuff, bodyParser;

  express = require('express');
  http = require('http');
  esprimaStuff = require('./esprimaStuff.js');
  bodyParser = require('body-parser')
  
  app = express();

  app.use(express["static"](__dirname + '/app'));
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  app.listen("8000");

  console.log('Server started at http://localhost:8080');

  app.post('/analyze',function(request, response){
    var input = request.body.stuff //note that 'stuff' is the expected object key
    var analyzed =  esprimaStuff.analyzeCode(input)
    response.status(200).send({output: analyzed});
  });
  

}).call(this);