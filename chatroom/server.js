var http = require('http');
var fs = require('fs');
var path = require('path');
/**
 * when serving files via http, it's not enough to just send the contents of a file;
 * we also should include the type of file being sent.
 * this is done by setting the Content-Type HTTP header with the proper MIME type for the file.
 * we need a third-party module called mime to look up these MIME types.
 */
var mime = require('mime');
// cache object is where the contents of cached files stored
var cache = {};

function send404(res){
  res.writeHead(404, {'Content-Type': 'text/plain'});
  res.write('Error 404: resource not found');
  res.end();
}

function sendFile(res, filePath, fileContents){
  res.writeHead(
    200,
    {"content-type": mime.lookup(path.basename(filePath))}
  );
  //console.log(mime.lookup(path.basename(filePath)));
  res.end(fileContents);
}

function serveStatic(res, cache, absPath){
  if(cache[absPath]){ // if file is cached in memory
    sendFile(res, absPath, cache[absPath]); // serve file from memory
  }else{
    fs.exists(absPath, function (exists){  // check if file exists
      if(exists){
        fs.readFile(absPath, function (err, data){ // read from disk
          if(err){
            send404(res);
          }else {
            cache[absPath] = data;
            sendFile(res, absPath, data);  // serve file read form disk
          }
        });
      }
    })
  }
}

var server = http.createServer(function (req, res){
  var filePath = '';
  
  if(req.url == '/'){
    filePath = 'public/index.html';
  }else{
    filePath = 'public' + req.url;
  }
  var absPath = './' + filePath;
  
  serveStatic(res, cache, absPath);
});

server.listen(3000, function (){
  console.log('server listening on port 3000');
});

var chatServer = require('./lib/chat_server');
chatServer.listen(server);