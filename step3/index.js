var EventProxy = require('eventproxy');
var superagent = require('superagent');
var cheerio = require('cheerio');
var url = require('url');

var cnodeUrl = 'https://cnodejs.org/';
var ep = new EventProxy();

superagent
  .get(cnodeUrl)
  .end(function (err, res){
    if(err){
      return console.err(err);
    }
    var topicUrls = [];
    var $ = cheerio.load(res.text);
    
    $('#topic_list .topic_title').each(function (idx, elem){
      var $elem = $(elem);
      var href = url.resolve(cnodeUrl, $elem.attr('href'));
      topicUrls.push(href);
    });
    
    // ep.after 重复监听 topicUrls.length 次 'topic_html' 事件, 如果全部就绪执行回调
    ep.after('topic_html', topicUrls.length, function (topics){
      // topics 是一个数组, [ [topicUrl, res.text], [topicUrl, res.text], [topicUrl, res.text]...]
      
      topics = topics.map(function (topicPair){
        
        var topicUrl = topicPair[0],
            topicHtml = topicPair[1],
            $ = cheerio.load(topicHtml);
            
            return ({
              title: $('.topic_full_title').text().trim(),
              href: topicUrl,
              comment1: $('.reply_content').eq(0).text().trim()
            });
      });
      
      console.log('final: ');
      console.log(topics);
      
    });
    
    
    // 获取每个title 的url 的页面内容, 发送 topic_html 事件
    topicUrls.forEach(function (topicUrl){
      superagent
        .get(topicUrl)
        .end(function (err, res){
          console.log('fetch ' + topicUrl + ' successful');
          ep.emit('topic_html', [topicUrl, res.text])
        })
                
    });
    
  });
  
  /**
   * todo:
   * learn more about eventproxy
   * https://github.com/JacksonTian/eventproxy
   */
  

  
