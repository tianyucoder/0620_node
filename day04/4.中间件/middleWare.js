/*
 中间件：
     概念：本质上就是一个函数，包含三个参数：request、response、next

 作用：
        1)	执行任何代码。
        2)	修改请求和响应对象。
        3)	终结请求-响应循环。(让一次请求得到响应)
        4)	调用堆栈中的下一个中间件或路由。
  分类：
        1)	应用(全局)级中间件（过滤非法的请求，例如防盗链）
              --第一种写法：app.use((request,response,next)=>{})
              --第二种写法：使用函数定义
        2)	第三方中间件（通过npm下载的中间件，例如body-parser）
              --app.use(bodyParser.urlencoded({extended:true}))
        3)	内置中间件（express内部封装好的中间件）
              --app.use(express.urlencoded({extended:true}))
              --app.use(express.static('public'))
        4)	路由器中间件 （Router）
              --后面讲
   备注：
        1.在express中，定义路由和中间件的时候，根据定义的顺序（代码的顺序），将定义的每一个中间件或路由，
        放在一个类似于数组的容器中，当请求过来的时候，依次从容器中取出中间件和路由，进行匹配，如果匹配
        成功，交由该路由或中间件处理。
        2.对于服务器来说，一次请求，只有一个请求对象，和一个响应对象，其他任何的request和response都是对二者的引用。
 */


let express = require('express')

let app = express()

//“全局”中间件的第一种定义方式 （应用级中间件）
/*app.use(function (request,response,next) {
  if(request.get('Referer').split('/')[2] === 'localhost:63348'){
    next()//让下一个能匹配的中间件或者路由生效
  }else{
    //response.send('禁止盗用本站图片')
    response.sendFile(__dirname+'/public/err.png')
  }
})*/

//“全局”中间件的第二种定义方式 （应用级中间件）---- 防盗链
/*function demo(request,response,next) {
  if(request.get('Referer').split('/')[2] === 'localhost:63348'){
    next()
  }else{
    //response.send('禁止盗用本站图片')
    response.sendFile(__dirname+'/public/err.png')
  }
}*/


//定义一个一级路由
app.get('/picture',function (request,response) {
  response.sendFile(__dirname+'/public/pic.png')
})

app.get('/meishi',function (request,response) {
  console.log(request.a)
  response.send('我是美食界面')
})


app.listen(3000,function (err) {
  if (!err) console.log('服务器ok')
  else  console.log(err)
})