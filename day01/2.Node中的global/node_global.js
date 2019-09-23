//1.浏览器端，js由哪几部分组成？
/*
*  1.BOM ----> window 浏览器对象模型 -------- 很多的API（location，history）
*  2.DOM ----> document 文档对象模型 ---------- 很多的API（对DOM的增删改查）
*  3.ES规范 -------------------- ES5、ES6.....
*/

//2.Node端，js由几部分组成？
/*
*   1.没有了BOM ----->  因为服务器不需要（服务端没有浏览器对象）
*   2.没有了DOM ----->  因为没有浏览器窗口
*   3.几乎包含了所有的ES规范
*   4.没有了window，但是取而代之的是一个叫做global的全局变量。
* */

//Node中禁止了全局的this指向global
console.log(global)