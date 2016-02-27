// 使用 async 控制并发
// 实际项目中必须控制一次的并发数，如果并发数太高，会被认为是恶意请求而被封锁ip

var async = require('async');

var curCount = 0;

var fetchUrl = function (url, callback){
  var delay = parseInt(Math.random() * 10000000 % 2000, 10);
  curCount++;
  console.log('现在的并发数是', curCount, ',正在抓取的是', url, ',耗时'+delay+'毫秒')
  setTimeout(function (){
    curCount --;
    callback(null, url+' html content');
  }, delay);
}

var urls = [];
for(var i=0; i<30; i++){
  urls.push('http://datasource_'+i);
}

// async.mapLimit(arr, limit, iterator, callback);

async.mapLimit(urls, 5, function (url, callback){
  fetchUrl(url, callback);
}, function (results){
  console.log('final.');
  console.log(results);
});