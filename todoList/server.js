var http = require('http');
var url = require('url');
var join = require('path').join;
var fs = require('fs');
var root = __dirname;
var items = [];
var server = http.createServer(function (req, res){ 
  switch(req.method){  // check http method by req.method property
    case 'POST':
      var item = '';
      // data event are fired whenever a new chunk of data has been read.
      // chunk which provided by data events is buffer object(a byte array), but normally we dont need binary data, 
      // by settings the stream encoding to ascii or utf8, the data events will instead emit strings
      req.setEncoding('utf8');
      req.on('data', function (chunk){
        item += chunk;
        console.log('parsed', chunk);
      });
      // the end event is fired when everything has been read
      req.on('end', function (){
        console.log('done parsing');
        items.push(item);
        res.end('ok\n');
      });
      break;
    case 'GET':
      // items.forEach(function (item, index){
      //   res.write(index + ')' + item + '\n');
      // });
      
      var body = items.map(function (item, i){
        return i + ')' + item;
      }).join('\n');
      // to speed up responses, the Content-Length field should be sent with response
      // setting the Content-Length header disables Node's chunked encoding, providing a performance boost because less data needs to be transfered;
      // 设置Content-Length, node 不会采用 chunked 编码传输方式, 极大的提高了性能-----这里不太懂为啥会 less data to be transfered
      // don't use body.length, because content-length should represent the byte length, not character length
      res.setHeader('Content-Length', Buffer.byteLength(body));
      res.setHeader('Content-Type', 'text/plain; charset="utf-8"');
      res.end(body);
      break;
    case 'DELETE':
      var path = url.parse(req.url).pathname;
      var i = parseInt(path.slice(1), 10);
      
      if(isNaN(i)){
        res.statusCode = 400;
        res.end('Invalid item id');
      }else if(!items[i]){
        res.statusCode = 404;
        res.end('item not found');
      }else{
        items.splice(i, 1);
        res.end('OK\n');
      }
      break;
    case 'PUT':
      var path = url.parse(req.url).pathname;
      var i = parseInt(path.slice(1), 10);
      
      if(isNaN(i)){
        res.statusCode = 400;
        res.end('Invalid item id');
      }else if(!items[i]){
        res.statusCode = 404;
        res.end('item not found');
      }else{
        items.splice(i, 1);
        res.end('OK\n');
      }
      break;
  }
});

server.listen(3000, function (){
  console.log('server is running at port 3000');
});

/**
 * run the app
 * 1,start the server
 * 2,use curl -d 'some data' http://localhost:3000      // the -d flag automatically sets the request method to POST and passes in the value as POST data
 * 3,use curl http://localhost:3000 to GET the data
 */