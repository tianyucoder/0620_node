//引入express框架
let express = require('express')
//引入db模块
let db = require('./db')
//引入usersModel模型对象，用于增删改查
let usersModel = require('./models/usersModel')
//实例应用对象
let app = express()
//对客户端隐藏服务器内部实现
app.disable('x-powered-by')
//使用中间件解析post请求的urlencoded编码参数
app.use(express.urlencoded({extended:true}))

//等待数据库连接成功
db.then(()=>{
  
  //展示登录界面的路由 --- UI路由
  app.get('/login',(req,res)=>{
    res.sendFile(__dirname+'/public/login.html')
  })

  //展示注册界面的路由 ---- UI路由
  app.get('/register',(req,res)=>{
    res.sendFile(__dirname+'/public/register.html')
  })

  //注册的路由 ----- 业务路由
  app.post('/register',async(req,res)=>{
    //1.获取用户输入的信息
    let {email,nick_name,pwd,re_pwd} = req.body
    //2.定义正则规则
    let emailReg = /^[a-zA-Z0-9_]{2,20}@[a-zA-Z0-9_]{2,16}\.com$/
    let nickNameReg = /[\u4e00-\u9fa5]/gm
    let pwdReg = /^[a-zA-Z0-9_@#$%]{6,20}$/
    //3.使用正则校验
    if(!emailReg.test(email)){
      res.send('邮箱输入不合法，格式应为：用户名@主机名.com的形式，用户名2-20，主机名2-16')
    }else if(!nickNameReg.test(nick_name)){
      res.send('昵称不合法，应为中文')
    }else if(!pwdReg.test(pwd)){
      res.send('密码不合法，包含大小写字母，和部分特殊字符，且长度为6-20')
    }else if(re_pwd !== pwd){
      res.send('两次输入密码不一致')
    }else{
      //可能出现错误的代码放在try中，若无错误正常走完try中所有代码，若有错误，带着错误信息进入catch
      try{
        //4.写入数据库之前，进行检查邮箱是否已经注册过了
        let findResult = await usersModel.findOne({email:email})
        if(findResult){
          //能进入此判断，意味着有人已经注册过了，驳回
          res.send(`${email}邮箱已经注册过，请更换邮箱`)
        }else{
          await usersModel.create({email,nick_name,pwd})
          console.log(`邮箱为${email}的用户注册成功了`)
          //res.send('恭喜，注册成功！')
          res.redirect('http://localhost:3000/login')
        }
      }
      catch(err){
        //1.通常会在这里引入报警模块
        //2.通常也会引入错误计数模块
        console.log(err)
        res.send('网络不稳定稍后重试！')
      }
    }
  })

  //登录的路由 ----- 业务路由
  app.post('/login',async(req,res)=>{
    //1.获取用户输入
    let {email,pwd} = req.body
    //2.正则
    let emailReg = /^[a-zA-Z0-9_]{2,20}@[a-zA-Z0-9_]{2,16}\.com$/
    let pwdReg = /^[a-zA-Z0-9_@#$%]{6,20}$/
    //3.校验
    if(!emailReg.test(email)){
      res.send('邮箱输入不合法，格式应为：用户名@主机名.com的形式，用户名2-20，主机名2-16')
    }else if(!pwdReg.test(pwd)){
      res.send('密码不合法，包含大小写字母，和部分特殊字符，且长度为6-20')
    }else{
      try{
        //4.去数据库中查找是否有该邮箱同时密码是否正确
        let findResult = await usersModel.findOne({email,pwd})
        if(findResult){
          res.redirect('http://news.baidu.com/')
        }else{
          res.send('用户名或密码不正确')
        }
      }
      catch(err){
        console.log(err)
        res.send('网络不稳定，稍后重试')
      }
    }

  })


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