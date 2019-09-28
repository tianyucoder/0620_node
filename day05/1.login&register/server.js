//引入express框架
let express = require('express')
//实例应用对象
let app = express()
//对客户端隐藏服务器内部实现
app.disable('x-powered-by')
//使用中间件解析post请求的urlencoded编码参数
app.use(express.urlencoded({extended:true}))

//注册的路由
app.post('/register',(req,res)=>{
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
    res.send('校验通过了')
  }

  //3.写入数据库之前，进行检查邮箱是否已经注册过了
  //若已经注册了，驳回
  //若未注册，写入数据库
})

//绑定端口监听
app.listen(3000,(err)=> {
  if(!err){
    console.log('服务器启动成功了')
  }else{
    console.log(err)
  }
})