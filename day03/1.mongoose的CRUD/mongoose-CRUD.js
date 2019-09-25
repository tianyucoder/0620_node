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


;(async()=>{
  //等待数据库连接
  try{ await dbPromise }
  catch(err){console.log('连接数据库失败',err)}

  //操作数据库的代码（增、删、改、查），把数据库想象成你家的“豪宅”

  //1.  请来一个保安，帮你看家
  let Schema = mongoose.Schema

  //2.制定一个进入你家的“规则”
  let studentSchema = new Schema({
    stu_id:{
      type:String,//限制学号只能是字符串
      required:true,//学号为必填项
      unique:true//学号唯一
    },
    name:{},
    age:{},
    sex:{},
    hobby:{},
    info:{},
    date:{},//数据写入数据库的时间
    enable_flag:{}//数据的有效标识
  })


})()





