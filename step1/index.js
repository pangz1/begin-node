var express = require('express');
var util = require('utility');

var app = express();

app.get('/', function (req, res){
  // req.query 取出 url ? 后面的参数, 格式是一个对象
  // req.body  取出 post 请求传来的 body 数据, 需要 body-parser中间件
  var q = req.query.q;
  
  // 调用 utility.md5 方法, 得到 md5 之后的值
  var md5Val = util.md5(q);
  
  res.send(md5Val);
});

app.listen(8888, function (req, res){
  console.log('app is running at port 8888');
});

/**
 * todo:
 * # learn more about utility 
 * https://github.com/node-modules/utility
 */