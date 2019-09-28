/*
* 负责展示静态页面的路由器
* */
//引入路由器构造函数
let {Router} = require('express')
//引入Node内置模块：path
let {resolve} = require('path')
//实例化一个可用的router
let router = new Router()

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

module.exports = router