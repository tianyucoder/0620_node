/*
* 定义登录、注册的业务路由
* */

//引入路由器构造函数
let {Router} = require('express')
//引入usersModel模型对象，用于增删改查
let usersModel = require('../models/usersModel')
//引入md5加密模块
let md5 = require('md5')
//实例化一个路由器
let router = new Router()

//注册的路由 ----- 业务路由
router.post('/register',async(req,res)=>{
  //1.获取用户输入的信息
  let {email,nick_name,pwd,re_pwd} = req.body
  //2.定义正则规则
  let emailReg = /^[a-zA-Z0-9_]{2,20}@[a-zA-Z0-9_]{2,16}\.com$/
  let nickNameReg = /[\u4e00-\u9fa5]/gm
  let pwdReg = /^[a-zA-Z0-9_@#$%]{6,20}$/
  //定义一个错误对象，专门用于收集错误
  let errMsg = {}
  //3.使用正则校验
  if(!emailReg.test(email)){
    errMsg.emailErr = '邮箱输入不合法，格式应为：用户名@主机名.com的形式，用户名2-20，主机名2-16'
  }
  if(!nickNameReg.test(nick_name)){
    errMsg.nickNameErr = '昵称不合法，应为中文'
  }
  if(!pwdReg.test(pwd)){
    errMsg.pwdErr = '密码不合法，包含大小写字母，和部分特殊字符，且长度为6-20'
  }
  if(re_pwd !== pwd){
    errMsg.rePwdErr = '两次输入密码不一致'
  }
  //最终判断用户的输入是否有错误
  if(JSON.stringify(errMsg) !== '{}'){
    //能进入即代表用户犯错了
    res.render('register',{errMsg})
    return
  }
  //可能出现错误的代码放在try中，若无错误正常走完try中所有代码，若有错误，带着错误信息进入catch
  try{
    //4.写入数据库之前，进行检查邮箱是否已经注册过了
    let findResult = await usersModel.findOne({email:email})
    if(findResult){
      //能进入此判断，意味着有人已经注册过了，驳回
      errMsg.emailErr = `${email}邮箱已经注册过，请更换邮箱`
      res.render('register',{errMsg})
    }else{
      await usersModel.create({email,nick_name,pwd:md5(pwd)})
      console.log(`邮箱为${email}的用户注册成功了`)
      //res.send('恭喜，注册成功！')
      res.redirect(`/login?email=${email}`)
    }
  }
  catch(err){
    //1.通常会在这里引入报警模块
    //2.通常也会引入错误计数模块
    console.log(err)
    errMsg.dbErr = '网络不稳定稍后重试！'
    res.render('register',{errMsg})
  }
})

//登录的路由 ----- 业务路由
router.post('/login',async(req,res)=>{
  //1.获取用户输入
  let {email,pwd} = req.body
  //2.正则
  let emailReg = /^[a-zA-Z0-9_]{2,20}@[a-zA-Z0-9_]{2,16}\.com$/
  let pwdReg = /^[a-zA-Z0-9_@#$%]{6,20}$/
  let errMsg = {}
  //3.校验
  if(!emailReg.test(email)){
    errMsg.emailErr = '邮箱输入不合法，格式应为：用户名@主机名.com的形式，用户名2-20，主机名2-16'
  }
  if(!pwdReg.test(pwd)){
    errMsg.pwdErr = '密码不合法，包含大小写字母，和部分特殊字符，且长度为6-20'
  }
  if(JSON.stringify(errMsg) !== '{}'){
    res.render('login',{errMsg})
    return
  }

  try{
    //4.去数据库中查找是否有该邮箱同时密码是否正确
    let findResult = await usersModel.findOne({email,pwd:md5(pwd)})
    if(findResult){
      //res.redirect('http://news.baidu.com/')
      //res.render('usercenter',{nickName:findResult.nick_name})
      //res.redirect(`/user_center?nick_name=${findResult.nick_name}`)
      //res.cookie('_id',findResult._id.toString(),{maxAge:1000 * 30})

      //req.session._id = findResult._id.toString()做了四件事情，如下：
      //1.开启一个session会话存储
      //2.将用户的_id放进去
      //3.获取到第一步“容器”的编码
      //4.返回给客户端一个cookie，里面包含“容器”编号
      req.session._id = findResult._id.toString()
      res.redirect('/user_center')
    }else{
      errMsg.loginErr = '用户名或密码错误'
      res.render('login',{errMsg})
    }
  }
  catch(err){
    console.log(err)
    errMsg.dbErr = '网络不稳定稍后重试！'
    res.render('register',{errMsg})
  }
})


module.exports = router