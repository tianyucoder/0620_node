/*
* 该模块主要负责创建studentModel
* */
//引入mongoose库
let mongoose = require('mongoose')

//1.  请来一个保安，帮你看家。 ------------ 引入模式对象
let Schema = mongoose.Schema

//2.制定一个进入你家的“规则” ------------  创建约束对象
let citiesSchema = new Schema()

//3.告诉保安你的规则 --------- 创建模型对象
module.exports = mongoose.model('cities',citiesSchema)
