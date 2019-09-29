//1.引入express
const express = require('express')

//2.请来一个服务员 ------ 创建app应用对象
const app = express()
//对客户端隐藏服务器内部实现
app.disable('x-powered-by')

//在本文件中所提及到的所有“路由”，都是指：后端路由
//设置路由：路由就是对请求的URL地址进行一个分类处理  可以理解为：key - value的组合

//根路由
app.post('/',function (request,response) {
  /*
 * 什么时候会来到这个回调函数里面？
 *     1.请求的方式必须是GET请求
 *     2.请求地址里写的虚拟路径必须是/,或者不写
 * */
  response.send('ok')
})

//一级路由
app.get('/meishi',function (request,response) {
  /*
  * 什么时候会来到这个回调函数里面？
  *     1.请求的方式必须是GET请求
  *     2.请求地址里写的虚拟路径必须是/meishi
  * */
  console.log(request.query) //获取客户端携带过来的查询字符串参数
  response.send('我是一堆好吃的')
})

app.get('/shenghuo',function (request,response) {
  /*
  * 什么时候会来到这个回调函数里面？
  *     1.请求的方式必须是GET请求
  *     2.请求地址里写的虚拟路径必须是/meishi
  * */
  response.send('我是生活相关页面')
})

app.get('/shenghuo/dnwx',function (request,response) {
  response.send('我是电脑维修相关页面')
})

app.listen(3000,function (err) {
  if(!err){
    console.log('服务器启动成功了')
  }else{
    console.log(err)
  }
})



