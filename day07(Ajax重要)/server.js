const express = require('express')

const app = express()

app.use(express.static(__dirname+'/public'))


//此路由响应get请求
app.get('/ajax_get',function (request,response) {
  response.send('你发来的是ajax-get请求，我接收到了')
})

app.listen(3000,function (err) {
  if(!err){
    console.log('练习ajax请求的服务器启动成功了')
    console.log('禁止使用编译打开网页！！！！！！！！！')
    console.log('测试原生Ajax-GET请求的页面是：http://localhost:3000/ajax_get.html')
  }else{
    console.log(err)
  }
})



