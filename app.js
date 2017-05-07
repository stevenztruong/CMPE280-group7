var swaggerTools = require('swagger-tools');
var jsyaml = require('js-yaml');
var fs = require('fs');

var http = require('http');

var express = require('express');
var app = express();
var serverPort = 4000;
var options = {
  swaggerUi: '/swagger.json',
  controllers: './Controllers',
};

var spec = fs.readFileSync('swagger.yaml', 'utf8');
var swaggerDoc = jsyaml.safeLoad(spec);

swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {
  // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
  app.use(middleware.swaggerMetadata());

  // Validate Swagger requests
  app.use(middleware.swaggerValidator());

  // Route validated requests to appropriate controller
  app.use(middleware.swaggerRouter(options));

  // Serve the Swagger documents and Swagger UI
  app.use(middleware.swaggerUi()); //  REMOVE or if-then-else for production !

  // Start the server
  http.createServer(app).listen(serverPort, function () {
    console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
    console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
  });

});
