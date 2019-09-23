/*
* 1.Node中的文件系统：
*     1.在NodeJs中有一个文件系统，所谓的文件系统，就是对计算机中的文件进行增删改查等操作。
*     2.在NodeJs中，给我们提供了一个模块，叫做fs模块(文件系统)，专门用于操作文件。
*     3.fs模块是Node的核心模块，使用的时候，无需下载，直接引入。
* 2.简单文件写入(异步)
*      fs.writeFile(file, data[, options], callback)
*           --file：要写入文件的路径+文件名
*           --data：要写入的数据
*           --options：配置对象（可选）
*                --encoding：编码，默认值：utf-8(万国码)
*                --mode：文件权限的设置，默认值是0o666
*                     --0o111:文件的可执行权限(几乎不用，linux有自己的一套文件权限控制)
*                     --0o222:文件的可写入权限
*                     --0o444:文件的可读取权限
*                --flag：
*                     --w:写入数据
*                     --a:追加数据
*           --callback:回调函数
*                --err错误对象
*/

//备注：简单文件写入是一次性将所有要写入的内容加载到内存中，随后进行写入，适用于写入较小的文件。

//引入fs模块
let fs = require('fs')
//进行简单文件写入
fs.writeFile(__dirname+'/0620.txt','美女',{
  mode:0o666,
  flag:'a'
},function (err) {
  if(err) console.log(err)
  else console.log('文件写入成功了！')
})
