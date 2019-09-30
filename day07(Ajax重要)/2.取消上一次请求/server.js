const express = require('express')

const app = express()

app.use(express.static(__dirname+'/public'))
app.use(express.urlencoded({extended:true}))


//此路由响应get请求
app.get('/get_code',function (request,response) {
  console.log('有人找我要验证码了')
  //1000 - 9999
  setTimeout(function () {
    let code = Math.floor( Math.random()*8999 + 1000)
    console.log(code)
    response.send(code.toString())
  },3000)
})

app.listen(3000,function (err) {
  if(!err){
    console.log('练习取消上一次请求的服务器启动成功了')
    console.log('【为了避免跨域问题，禁止使用编译打开网页！！！！！！！！！】')
    console.log('页面是：http://localhost:3000/demo.html')
  }else{
    console.log(err)
  }
})



