/*
* 简单文件读取
* fs.readFile(path[, options], callback)
*     --path:读取文件的路径+文件名
*     --options：配置对象
*         --encoding：默认值是null
*         --flag：默认值是r
*     --callback：回调函数
*         --err:错误对象
*         --data:读取出来的数据
* */
//备注1：在Node中有一个而设计的原则：错误优先
//备注2：简单文件读取，是将要读取的数据一次性加载到内存中，容易造成内存泄露，使用于：小文件的读取

//引入fs模块
let fs = require('fs')

fs.readFile(`${__dirname}/music.mp3`,{
  flag:'r'
},(err,data)=>{
  if(!err){
    //思考：为什么读取出来的东西，不是直接能看得懂的字符串，而是二进制的Buffer（转成16进制之后的数据）
    //编码人员读取的不一定是纯文本的数据，有可能是：音频、视频等等
    //console.log(data.toString())//Buffer实例的toString是将二进制的Buffer转成字符串
    fs.writeFile(`${__dirname}/music2.mp3`,data,(err)=>{
        if(!err){
          console.log('文件写入成功')
        }else{
          console.log(err)
        }
    })
  }else{
    console.log(err)
  }
})