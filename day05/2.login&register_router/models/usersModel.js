/*
* 该模块主要负责创建usersModel
* */
//引入mongoose库
let mongoose = require('mongoose')

//1.  请来一个保安，帮你看家。 ------------ 引入模式对象
let Schema = mongoose.Schema

//2.制定一个进入你家的“规则” ------------  创建约束对象
let usersSchema = new Schema({
  email:{
    type:String,
    required:true,
    unique:true
  },
  nick_name:{
    type:String,
    required:true,
  },
  pwd:{
    type:String,
    required:true,
  },
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
module.exports = mongoose.model('users',usersSchema)
