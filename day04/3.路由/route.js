let express = require('express')

let app = express()

//根路由
app.get('/',(request,response)=>{
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

//根路由
app.post('/',(request,response)=>{
  console.log(request.query);
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
  console.log(request.params);
  response.send(`我是${request.params.id}号商家`)
})


app.listen(3000,(err)=>{
  if(!err){
    console.log('服务器启动成功了')
  }else{
    console.log(err)
  }
})