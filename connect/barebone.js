var connect = require('connect');
var logger = require('./logger');
var hello = require('./hellow');
var app = connect();

app
  .use(logger)
  .use(hello)
  .listen(3000);

/**
 * curl localhost:3000 will get a 'Cannot Get' response
 * because no middleware handle the request
 */