const express=require('express')
const app=express()
app.use(express.json())
app.use('/images',express.static(__dirname+'/images'))

module.exports=app