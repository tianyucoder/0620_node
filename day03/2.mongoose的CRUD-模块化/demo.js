//引入数据库连接模块
let db = require('./db')
//引入studentsModel模型对象
let studentModel = require('./models/studentsModel')
let teachersModel = require('./models/teachersModel')

;(async()=>{
  //等待数据库连接
  try{ await db }
  catch(err){console.log('连接数据库失败',err)}

  studentModel.find({age:19},function (err,data) {
    if (!err) console.log(data)
    else console.log(err)
  })

  //创建一个老师文档
  teachersModel.create({
    teac_id:'0005',
    name:'李五',
    age:22,
    sex:'女',
    hobby:['吃饭','睡觉','打张老师'],
    info:'有点帅气',
  },function (err,data) {
    if (!err) console.log(data)
    else console.log(err)
  })
})()





