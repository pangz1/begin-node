var http = require('http');
var parse = require('url').parse;
var join = require('path').join;
var fs = require('fs');

var root = __dirname;

var server = http.createServer(function (req, res){
  var url = parse(req.url);
  var path = join(root, url.pathname);
  /**
   * fs.ReadStream emits data events as incrementally read file from disk
   */
  console.log(path);
  var stream = fs.createReadStream(path);
  // stream.on('data', function (chunk){
  //   res.write(chunk);
  // });
  // stream.on('end', function (){
  //   res.end();
  // });
  stream.pipe(fs.createWriteStream('./req-body.txt'));
  stream.on('error', function (){
    res.statusCode = 500;
    res.end('Intern server error');
  });
});

server.listen(3000);