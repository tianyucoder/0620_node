//引入express框架
let express = require('express')
//引入db模块
let db = require('./db')
//引入UI路由器，用于展示页面
let uiRouter = require('./router/uiRouter')
//引入登录、注册的业务路由
let loginRegisterRouter = require('./router/loginRegisterRouter')
//引入express-session,用于操作session
let session = require('express-session');
//引入connect-mongo，用于进行session的持久化
let MongoStore = require('connect-mongo')(session);

//实例应用对象
let app = express()

app.use(session({
  name: 'auth',   //设置cookie的name，默认值是：connect.sid
  secret: 'atguigu', //参与加密的字符串（又称签名）
  saveUninitialized: false, //是否在存储内容之前创建会话
  resave: true ,//是否在每次请求时，强制重新保存session，即使他们没有变化
  store: new MongoStore({
    url: 'mongodb://localhost:27017/sessions_container',
    touchAfter: 24 * 3600 //修改频率（例：//在24小时之内只更新一次）
  }),
  cookie: {
    httpOnly: true, // 开启后前端无法通过 JS 操作cookie
    maxAge: 1000*60 // 设置cookie的过期时间
  },
}));

//对客户端隐藏服务器内部实现
app.disable('x-powered-by')
//使用中间件解析post请求的urlencoded编码参数
app.use(express.urlencoded({extended:true}))
//设置模板引擎
app.set('view engine','ejs')
//设置模板目录
app.set('views','./views')

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