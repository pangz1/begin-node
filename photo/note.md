## setting environment variables

in unix systems
  <pre>
    $ NODE_ENV=production node app
  </pre>
  
in windows
  <pre>
    $ set NODE_ENV=production 
    $ node app
  </pre>
  
## process.env.NODE_ENV 可以设置运行环境, 可以用 app.get('env')来获取这个值

通常用于配置：

  <pre>
    // 所有环境
    app.set('photos', __dirname + '/public/photos');
    // 生产环境
    if(app.get('env') === 'production'){
      app.set('photos', '/mouted-volume/photos');
    }
  </pre>

## render view

  express 提供了两种 render 方法：
    
  app.render() 和 res.render()
  
  res.render('view_name', data);
  
  eg
    res.render('photos', {
      title: 'Photos',
      photos: photos
    });
  
## view caching
  
  view caching 在生产环境默认启用，它会将view 缓存在内存中， 避免后面的 render 反复地进行磁盘读取， 极大的提高了性能
  缺点是如果启用了 view caching 每次修改 view 必须重启服务， 所以在 develop 环境应该禁止它
  
## application variables

  app.locals application-level variables
  req.locals request-level variables
  
  默认情况下，express 只暴露一个全局对象 settings，settings 包含所有通过 app.set() 方法设置所有属性
  eg
    app.set('titile', 'My Application');
    app.setttings.title // My Application
    
  在内部，node 通过下面的js语句暴露 settings 这个全局对象
    
    app.locals.settings = app.settings;
    
  app.locals 也是一个函数，可以传入一个对象，所有的 key 值会被合并到 app.locals 这个对象上
    
    var obj = {
      prev: 'Prev',
      next: 'Next',
      save: 'Save'
    }
    app.locals(obj);
  
  这样所有的模板都可以访问 prev, next 和 save 了, 传递给 res.render() 中的值具有最高的优先级， 其次是 req.locals， 最后是 app.locals
  
  可以通过这种方式，为模板添加 帮助方法 来帮助处理数据
    
    app.locals(require('./helps'));
  