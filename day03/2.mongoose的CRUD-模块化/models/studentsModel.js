/*
* 该模块主要负责创建studentModel
* */
//引入mongoose库
let mongoose = require('mongoose')

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
module.exports = mongoose.model('students',studentSchema)
