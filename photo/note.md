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
  
## view caching
  
  view caching 在生产环境默认启用，它会将view 缓存在内存中， 避免后面的 render 反复地进行磁盘读取， 极大的提高了性能
  缺点是如果启用了 view caching 每次修改 view 必须重启服务， 所以在 develop 环境应该禁止它