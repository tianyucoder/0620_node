let express= require('express')

let app = express()

//demo路由不对进行任何cookie的操作
app.get('/demo',(request,response)=>{
  response.send('我是demo路由返回的信息')
})

//当访问test1路由的时候，会给客户端种下一个cookie
app.get('/test1',(request,response)=>{
  response.cookie('demo','0620')
  response.send('我给你“种”下了一个cookie，你赶紧看一看')
})

app.listen(3000,function (err) {
  if(!err){
    console.log('服务器启动成功了')
  }else{
    console.log(err)
  }
})