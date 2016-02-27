var express = require('express');
var eventproxy = require('eventproxy');
var superagent = require('superagent');
var cheerio = require('cheerio');
var url = require('url');

var cnodeUrl = 'https://cnodejs.org/';

var app = express();

app.get('/', function (req, res){
  superagent
  .get(cnodeUrl)
  .end(function (err, sres){
    if(err){
      return console.err(err);
    }
    var items = [];
    console.log(sres.text);
    var $ = cheerio.load(sres.text);
    
    $('#topic_list .topic_title').each(function (idx, elem){
      var $elem = $(elem);
      items.push({
        title: $elem.attr('title'),
        href: $elem.attr('href')
      });
    });
    res.send(items);
    //console.log(topicUrls);
    
  })
});

app.listen(8888, function (){
  console.log('app is running at port 8888');
});

/**
 * todo:
 * learn more about superagent and cheerio
 * http://visionmedia.github.io/superagent/
 * https://github.com/cheeriojs/cheerio
 */
