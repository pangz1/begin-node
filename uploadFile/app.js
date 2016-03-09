var http = require('http');
var formidable = require('formidable');

http.createServer(function (req, res){
  switch(req.method){
    case 'GET':
      show(req, res);
      break;
    case 'POST':
      upload(req, res);
      break;
  }
}).listen(3000, function (){
  console.log('server is running at port 3000');
});

function show(req, res){
  var html = '<html><head><title>Todo List</title></head><body>'
              + '<h1>Upload File</h1>'
              + '<form method="post" action="/" enctype="multipart/form-data">'
              + '<p><input type="text" name="name"></p>'
              + '<p><input type="file" name="file"></p>'
              + '<p><input type="submit" value="Upload"></p>'
              + '</form></body></html>';
              
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Content-Length', Buffer.byteLength(html));
  res.end(html);
}

function upload(req, res){
  if(!isFormData(req)){
    res.statusCode = 400;
    res.end('Bad request: expecting multipart/form-data');
    return;
  }
  
  var form = new formidable.IncomingForm();
  
  form.on('field', function (field, value){
    console.log(field);
    console.log(value);
  });
  
  form.on('file', function (name, file){ // emitted when a file upload is complete
    console.log(name);
    console.log(file);
  });
  
  form.on('end', function (){
    res.end('upload complete');
  });
  
  form.parse(req);
  
  /**
   * following is an other higher-level api
   * 
   * var form = new formidable.IncomingForm();
   * form.parse(req, function (err, fields, files){
   *   console.log(fields);
   *   console.log(files);
   *   res.end('upload complete');
   * })
   */
  
    form.on('progress', function (bytesReceived, bytesExpected){
      var percent = Math.floor(bytesReceived / bytesExpected * 100);
      console.log(percent);
    });
}

function isFormData(req){
  console.log(req.headers['content-type']);
  var type = req.headers['content-type'] || '';
  return 0 == type.indexOf('multipart/form-data');
}