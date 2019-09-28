let express = require('express')

let app = express()
//设置模板引擎，告诉服务器到底用哪一个模板引擎
app.set('view engine','ejs')
//设置模板目录，告诉服务器模板放在哪了？
app.set('views','./haha')

app.get('/demo',(req,res)=>{
  //let str = 'hello,0620!'
  //res.sendFile(__dirname+'/haha/demo.ejs')
  let personArr = [{name:'peiqi',age:18},{name:'danni',age:19},{name:'peideluo',age:20},{name:'suxi',age:21}]
  res.render('demo',{msg:{persons:personArr}})
})

app.listen(3000,function (err) {
  if(!err) console.log('ok')
  else console.log(err)
})