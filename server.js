(function() {
  var app, express, http, esprimaStuff, bodyParser;

  express = require('express');
  http = require('http');
  esprimaStuff = require('./esprimaStuff.js');
  bodyParser = require('body-parser')
  
  app = express();

  app.set('port', (process.env.PORT || 8000));
  app.use(express["static"](__dirname + '/app'));
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  app.listen(app.get('port'), function() {
    console.log("Node app is running at localhost:" + app.get('port'));
  });

  app.post('/analyze',function(request, response){
    var input = request.body.stuff //note that 'stuff' is the expected object key
    var analyzed =  esprimaStuff.analyzeCode(input)
    response.status(200).send({output: analyzed});
  });
  

}).call(this);