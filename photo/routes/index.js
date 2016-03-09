var express = require('express');
var router = express.Router();
var photos = require('./photos');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/upload', photos.form);
router.post('/upload', photos.submit(app.get('photos')));

// app.get() 如果只有一个参数的情况下是取出 app.set() 设置的值，如果有两个参数，则是处理请求

module.exports = router;
