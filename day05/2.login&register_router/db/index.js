/*
* 该模块主要负责数据库的连接
*
* */
//1.引入mongoose模块
const mongoose = require('mongoose')
//使用一个新的索引器
mongoose.set('useCreateIndex',true)

//数据库配置变量
const DB_NAME = 'demo'
const DB_URL = '127.0.0.1'
const PORT = '27017'

//2.使用mongoose连接数据库
mongoose.connect(`mongodb://${DB_URL}:${PORT}/${DB_NAME}`,{
  useNewUrlParser: true,
  useUnifiedTopology: true
})

module.exports = new Promise((resolve,reject)=>{
  //3.绑定监听
  mongoose.connection.on('open',(err)=>{
    if(!err){
      resolve()
      console.log(`位于${DB_URL}机器上${PORT}端口的${DB_NAME}数据库连接成功`)
    }else{
      reject(err)
    }
  })
})
