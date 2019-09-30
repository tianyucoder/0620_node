const express = require('express')

const app = express()

app.use(express.urlencoded({extended:true}))

//此路由响应get请求
app.get('/test',function (request,response) {
  let {callback} = request.query
  let data = [{name:'kobe',age:18},{name:'wade',age:19},{name:'peiqi',age:20}]
  response.send(`${callback}(${JSON.stringify(data)})`)
})

app.listen(3000,function (err) {
  if(!err){
    console.log('验证jsonp解决跨域服务器启动成功')
    console.log('【为了制造跨域问题，必须使用编译打开网页！！！！！！！！！】')
  }else{
    console.log(err)
  }
})



