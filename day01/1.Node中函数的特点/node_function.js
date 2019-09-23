/*
* 1.Node中任何一个模块（js文件）都被一个外层函数所包裹
*     function (exports, require, module, __filename, __dirname) {}
*         --exports:用于支持CommonJs模块化语法，暴露
*         --require:用于支持CommonJs模块化语法，引入
*         --module:用于支持CommonJs模块化语法，暴露
*         --__filename:
*         --__dirname:
*
* 2.为什么要有这个外层函数（这个外层函数有什么作用？）
*       1.用于支持CommonJs模块化语法
*       2.隐藏内部实现
* */

//输出包裹着的外层函数
console.log(arguments.callee.toString())

console.log(__filename)
console.log(__dirname)
/*
* C:\Users\tianyu\Desktop\0620_node\day01\1.Node中函数的特点\node_function.js
  C:\Users\tianyu\Desktop\0620_node\day01\1.Node中函数的特点
* */


