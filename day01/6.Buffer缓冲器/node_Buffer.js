/*
* 1.Buffer是什么？
*    1.它是一个【类似于数组】的对象，用于存储数据（存储的是二进制数据）。
*    2.Buffer的效率很高，存储和读取很快，它是直接对计算机的内存进行操作。
*    3.Buffer的大小一旦确定了，不可修改。
*    4.每个元素占用内存的大小为1字节。
*    5.Buffer是Node中的非常核心的模块，无需下载、无需引入,直接即可使用
*
* 2. 进制转化
*       十六进制：00 ----- ff
*       十进制：0 ----- 255
*       二进制：00000000 ------ 11111111
*
* 3.内存单位的换算
*       8位(bit)  = 1字节(Byte)
*       1024Byte = 1KB
*       1024Kb = 1MB
*       1024Mb = 1GB
*       ...
* */

//1.使用new关键字创建一个Buffer实例，即将废弃，因为：1.效率极低；2.存在一些性能问题
let buf = new Buffer(10)
console.log(buf)

//2.使用Buffer.alloc创建一个Buffer实例，效率比new关键字稍高
let buf2 = Buffer.alloc(10)
console.log(buf2)

//3.Buffer.allocUnsafe创建一个Buffer实例，效率最高的一种方式
/*
* 1.为什么通过Buffer.allocUnsafe创建出来的实例，里面不为空？
* 2.为什么存的是二进制，输出的却不是二进制？ ---- 存储的确实为二进制数据，但是，一旦输出为了便于观察，自动转成16进制。
* */
let buf3 = Buffer.allocUnsafe(10)
console.log(buf3)

//4.将一个字符串保存在Buffer中
let str = 'HELLO ATGUIGU'
let buf4 = Buffer.from(str)
console.log(buf4)


