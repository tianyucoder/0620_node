const express = require('express')

const app = express()

app.use(express.urlencoded({extended:true}))

//此路由响应get请求
app.get('/ajax_get',function (request,response) {
  console.log('有人给我发GET请求了')
  console.log(request.query)
  response.set('Access-Control-Allow-Origin','http://localhost:63347')
  response.send(`你发来的是ajax-get请求，我接收到了`)
})

app.post('/ajax_post',function (request,response) {
  response.set('Access-Control-Allow-Origin','http://localhost:63347')
  console.log('有人给我发POST请求了')
  console.log(request.body)
  response.send('你发来的是ajax-post请求，我接收到了')
})

app.listen(3000,function (err) {
  if(!err){
    console.log('练习ajax请求的服务器启动成功了')
    console.log('【为了演示跨域问题，必须使用编译打开网页！！！！！！！！！】')
  }else{
    console.log(err)
  }
})



