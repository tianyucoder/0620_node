//引入express框架
let express = require('express')
//引入db模块
let db = require('./db')
//引入UI路由器，用于展示页面
let uiRouter = require('./router/uiRouter')
//引入登录、注册的业务路由
let loginRegisterRouter = require('./router/loginRegisterRouter')
//实例应用对象
let app = express()
//对客户端隐藏服务器内部实现
app.disable('x-powered-by')
//使用中间件解析post请求的urlencoded编码参数
app.use(express.urlencoded({extended:true}))
//暴露静态资源
app.use(express.static(__dirname+'/public'))

//等待数据库连接成功
db.then(()=>{

  //使用uiRouter
  app.use(uiRouter)

  //使用登录、注册路由器
  app.use(loginRegisterRouter)

}).catch((err)=>{
    console.log(err)
})

//绑定端口监听
app.listen(3000,(err)=> {
  if(!err){
    console.log('服务器启动成功了')
  }else{
    console.log(err)
  }
})