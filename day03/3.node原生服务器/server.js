/*
* 搭建Node原生服务器
* */

//引入Node内置的Http模块
let http = require('http');

//搞一个服务员出来-------创建服务对象
let server = http.createServer(function (request,response) {
    //请求对象：包含着客户端发给服务器的信息
    //响应对象：包含着服务器发给客户端的信息
    console.log('有人请求服务器了')
    response.setHeader('content-type','text/html;charset=utf-8')
    response.end('<h1>第一个服务器，好开心</h1>')
})

//指定端口运行
server.listen(3000,function (err) {
  if(!err){
    console.log('服务器启动成功了')
  }else{
    console.log(err)
  }
})