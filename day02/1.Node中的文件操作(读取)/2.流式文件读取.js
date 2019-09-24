/*
* 流式文件读取(异步)
* fs.createReadStream(path[, options])
*   --path:读取文件的路径+文件名
*   --options：配置对象
*       --flags
*       --encoding
*       --fd
*       --mode
*       --autoClose
*       --start
*       --end
*       --highWaterMark
* */

let fs = require('fs');

let rs = fs.createReadStream(`${__dirname}/music.mp3`)

//只要用到了流，就要对流进行监听
rs.on('open',function () {
  console.log('可读流打开了')
})

rs.on('close',function () {
  console.log('可读流关闭了')
})

//给可读流绑定一个data事件，会自动触发可读流读取数据
rs.on('data',(err,data)=>{
    if(!err){
      console.log(data)
    }else{
      console.log(err)
    }
})