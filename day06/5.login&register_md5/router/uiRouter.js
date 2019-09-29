/*
* 负责展示静态页面的路由器
* */
//引入路由器构造函数
let {Router} = require('express')
//引入Node内置模块：path
let {resolve} = require('path')
//引入解析cookie的中间件
let cookieParser = require('cookie-parser')
//引入模型对象
let usersModel = require('../models/usersModel')
//实例化一个可用的router
let router = new Router()
router.use(cookieParser())

//展示登录界面的路由 --- UI路由
router.get('/login',(req,res)=>{
  //let url = resolve(__dirname,'../public/login.html')
  //res.sendFile(url)
  let {email} = req.query
  res.render('login',{errMsg:{email:email}})
})

//展示注册界面的路由 ---- UI路由
router.get('/register',(req,res)=>{
  //let url = resolve(__dirname,'../public/register.html')
  //res.sendFile(url)
  res.render('register',{errMsg:{}})
})

//展示个人中心界面的路由 ---- UI路由
router.get('/user_center',async (req,res)=>{
  //1.读取用户带过来的cookie中的容器编号
  //2.根据传递过来的编号，匹配容器
  //3.若匹配上了，从容器中拿出指定的数据（昵称）
  //4.渲染个人中心页面
  let {_id} = req.session
  console.log(_id)
  if(_id){
    //若能进入判断，代表用户携带的cookie中包含_id，随后进行数据库查询
    let findResult = await usersModel.findOne({_id})
    console.log(findResult)
    if(findResult){
      //若能进入判断，代表用户携带的cookie中包含_id是合法的，即：根据此id能匹配上一个用户
      res.render('usercenter',{nickName:findResult.nick_name})
    }else{
      //若能进入判断，代表用户携带的cookie中包含_id是不合法的，即：用户非法修改了cookie
      res.redirect('/login')
    }
  }else{
    res.redirect('/login')
  }





})


module.exports = router