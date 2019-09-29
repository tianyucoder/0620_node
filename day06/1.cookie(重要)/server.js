let express= require('express')
let cookieParser = require('cookie-parser')

let app = express()
app.use(cookieParser())

//demo路由不对进行任何cookie的操作
app.get('/demo',(request,response)=>{
  response.send('我是demo路由返回的信息')
})

//当访问test1路由的时候，会给客户端种下一个cookie
app.get('/test1',(request,response)=>{
  //在express中给客户端“种”下一个cookie，不用借助任何的第三方库。

  //给客户端种下一个会话cookie，关闭浏览器，cookie立刻消失
  //response.cookie('demo','你好0620')

  //给客户端种下一个持久化cookie，到了过期时间，或者用户清空cookie，cookie立刻消失
  response.cookie('demo','0620',{maxAge:1000 * 30})
  response.cookie('demo1','hello',{maxAge:1000 * 30})

  response.send('我给你“种”下了一个cookie，你赶紧看一看')
})

//test2用于获取客户端携带过来的cookie
app.get('/test2',(request,response)=>{
  //在express中读取cookie，要借助一个中间件，名为：cookie-parser
  let {demo} = request.cookies
  console.log(demo)
  response.send('我读取出来了你携带过来的cookie，你看看吧')
})

//test3用户通知浏览器删除一个cookie
app.get('/test3',(request,response)=>{
  //第一种删除cookie的方式
  //response.clearCookie('demo')

  //第二种删除cookie的方式
  response.cookie('demo','',{maxAge:0})
  response.send('我已经命令了你删除了指定的cookie')
})

app.listen(3000,function (err) {
  if(!err){
    console.log('服务器启动成功了')
  }else{
    console.log(err)
  }
})