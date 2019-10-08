let express = require('express')
let db = require('./db')
let citiesModel = require('./models/citiesModel')
let app = express()

db.then(()=>{
  //返回所有省份信息
  app.get('/get_all_province',async(req,res)=>{
   res.set('Access-Control-Allow-Origin','*')
   try{
    let result =  await citiesModel.find({level:1},{name:1,province:1,_id:0})
    res.send({state:1,data:result})
   }
   catch(err){
     console.log(err)
     res.send({state:0,err:'查询时出现错误'})
   }
  })

  //根据省份的编码，返回该省下的所有市的信息
  app.get('/get_cities_by_province',async(req,res)=>{
    res.set('Access-Control-Allow-Origin','*')
    let {province} = req.query
    try{
      let result =  await citiesModel.find({level:2,province},{name:1,city:1,_id:0})
      res.send({state:1,data:result})
    }
    catch(err){
      console.log(err)
      res.send({state:0,err:'查询时出现错误'})
    }
  })

  //根据省份、市编码，返回某省下某市下的所有区县信息
  app.get('/get_counties_by_pro_and_city',async(req,res)=>{
    res.set('Access-Control-Allow-Origin','*')
    let {province,city} = req.query
    try{
      let result =  await citiesModel.find({level:3,province,city},{name:1,code:1,_id:0})
      res.send({state:1,data:result})
    }
    catch(err){
      console.log(err)
      res.send({state:0,err:'查询时出现错误'})
    }
  })

},(err)=>{
   console.log(err)
})


app.listen(3000,(err)=>{
  if(!err){
    console.log('服务器启动成功了')
  }else{
    console.log(err)
  }
})