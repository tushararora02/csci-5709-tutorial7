const MongoConnect=require("./dbconfig");
const express=require('express')
const app=express()
const route=require('./route')

MongoConnect()
app.use(express.json())
app.use('',route)

module.exports=app
