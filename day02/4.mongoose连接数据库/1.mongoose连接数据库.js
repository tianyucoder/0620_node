/*
* mongoDB:一个数据库品牌的名字
* mongod:启动数据库服务的命令
* mongo:连接数据库的命令（用mongoDB自带的“黑窗口”去连接）
* mongoose:一个优秀的库，用于在Node平台上，让我们更加简单、方便、稳定的连接和操作mongoDB数据库
* */

//1.引入mongoose模块
const mongoose = require('mongoose')

//2.使用mongoose连接数据库
mongoose.connect('mongodb://localhost:27017/demo',{
  useNewUrlParser: true,
  useUnifiedTopology: true
})

let dbPromise = new Promise((resolve,reject)=>{
  //3.绑定监听
  mongoose.connection.on('open',(err)=>{
    if(!err){
      resolve()
      console.log('数据库连接成功了')
    }else{
      reject(err)
    }
  })
})


//第一种使用Promise实例的方式
/*dbPromise
  .then(()=>{
    console.log('操作数据库的代码')
  },(err)=>{
     console.log(err)
  })*/

//第二种使用Promise实例的方式
/*dbPromise
  .then(()=>{
      console.log('操作数据库的代码')
  }).catch((err)=>{
      console.log(err)
  })*/


;(async()=>{
  try{ await dbPromise }
  catch(err){console.log('连接数据库失败',err)}
  console.log('操作数据库')
})()





