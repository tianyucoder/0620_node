let express = require('express')

let app = express()

//根路由
app.get('/',(request,response)=>{
  /*
   request提供的方法：
      request.query	获取查询字符串的参数，拿到的是一个对象
      request.params 获取参数路由的参数，拿到的是一个对象
      request.body 获取post请求体参数，拿到的是一个对象(但要借助一个中间件）
      request.get(xxxx)	获取请求头中指定key对应的value

   response提供的方法：
      response.send()	给浏览器做出一个响应
      response.end()	给浏览器做出一个响应（不会自动追加响应头）
      response.download()	告诉浏览器下载一个文件
      response.sendFile()	给浏览器发送一个文件
      response.redirect()	重定向到一个新的地址（url）
      response.set(key,value)	自定义响应头内容
      response.get()	获取响应头指定key对应的value(不常用)
      response.status(code)	设置响应状态码
   */
  //console.log(request.query);
  //console.log(request.get('Host'))
  //response.download('./public/chrome.exe') //可以写相对路径
  //response.sendFile(__dirname+'/public/demo.zip') //必须写绝对路径
  //response.redirect('https://www.baidu.com') //redirect属于客户端跳转
  //response.set('demo','0620')
  response.send('ok')
  //console.log(response.get('x-powered-by'));
})

//根路由
app.post('/',(request,response)=>{
  console.log(request.body);
  response.send('ok')
})

//一级路由
app.get('/meishi',(request,response)=>{
  console.log(request.query);
  response.send('ok')
})

//二级路由
app.get('/meishi/huoguo',(request,response)=>{
  /*
  * request提供的方法
  *   request.query	获取查询字符串的参数，拿到的是一个对象
      request.params	获取get请求参数路由的参数，拿到的是一个对象
      request.body	获取post请求体，拿到的是一个对象（要借助一个中间件）
      request.get(xxxx)	获取请求头中指定key对应的value
  *
  * */
  console.log(request.query);
  response.send('ok')
})

//参数路由
app.get('/meishi/:id',(request,response)=>{
  console.log(request.params); //{id:xxxxxxxxx}
  response.send(`我是${request.params.id}号商家`)
})


app.listen(3000,(err)=>{
  if(!err){
    console.log('服务器启动成功了')
  }else{
    console.log(err)
  }
})