/*
* mongoDB:一个数据库品牌的名字
* mongod:启动数据库服务的命令
* mongo:连接数据库的命令（用mongoDB自带的“黑窗口”去连接）
* mongoose:一个优秀的库，用于在Node平台上，让我们更加简单、方便、稳定的连接和操作mongoDB数据库
* */

//1.引入mongoose模块
const mongoose = require('mongoose')
//使用一个新的索引器
mongoose.set('useCreateIndex',true)

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

  //1.  请来一个保安，帮你看家。 ------------ 引入模式对象
  let Schema = mongoose.Schema

  //2.制定一个进入你家的“规则” ------------  创建约束对象
  let studentSchema = new Schema({
    stu_id:{
      type:String,//限制学号只能是字符串
      required:true,//学号为必填项
      unique:true//学号唯一
    },
    name:{
      type:String,
      required:true,
    },
    age:{
      type:Number,
      required:true,
    },
    sex:{
      type:String,
      required:true
    },
    hobby:[String],
    info:Schema.Types.Mixed,
    date:{ //数据写入数据库的时间
      type:Date,
      default:Date.now()
    },
    enable_flag:{ //数据的有效标识
      type:String,
      default:'Y'
    }
  })

  //3.告诉保安你的规则 --------- 创建模型对象
  let studentModel = mongoose.model('students',studentSchema)

  //练习增删改查

  //新增数据 --- 传入回调
  /*studentModel.create({
    stu_id:'0003',
    name:'王琦',
    age:20,
    sex:'女',
    hobby:['逛街','化妆','打程老师'],
    info:'有点漂亮',
  },function (err,data) {
    if(!err){
      console.log(data)
    }else{
      console.log(err)
    }
  })*/

  //新增数据 --- 不传入回调，返回值是Promise实例
  /*let a = studentModel.create({
    stu_id:'0005',
    name:'李五',
    age:22,
    sex:'女',
    hobby:['吃饭','睡觉','打张老师'],
    info:'有点帅气',
  })
  
  /!*a.then((data)=>{
      console.log('进入成功的回调')
      console.log(data)
  }).catch((err)=>{
    console.log('进入失败的回调')
      console.log(err)
  })*!/
  let result = await a
  console.log(result);*/

  //查找数据
  /*studentModel.find({age:190},function (err,data) {
    if (!err) console.log(data)
    else console.log(err)
  })*/
  /*studentModel.findOne({stu_id:'0001'},{name:1,age:1,_id:0},function (err,data) {
    if (!err) console.log(data)
    else console.log(err)
  })*/

  //更新数据
  /*studentModel.updateMany({sex:'女'},{sex:'男'},(err,data)=>{
    if (!err) console.log(data)
    else console.log(err)
  })*/

  /*studentModel.deleteMany({age:22},(err,data)=>{
    if (!err) console.log(data)
    else console.log(err)
  })*/


})()





