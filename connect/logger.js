/**
 * a middleware component is a function that conventioned with 3 arguments:
 * req, res, next callback function.
 */

function logger(req, res, next){
  console.log('%s %s', req.method, req.url);
  next();
}

module.exports = logger;