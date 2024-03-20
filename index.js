const express = require('express')
const cors=require('cors')
const app=express()
app.use(express.json())
require('dotenv').config()
const httpStatusText=require('./utils/httpStatusText')
console.log("process.env.mongo_url   :  ",process.env.mongo_url)
const mongoos=require('mongoose')
const url=process.env.mongo_url
const path=require('path')

app.use('/uploads',express.static(path.join(__dirname,'uploads')))
mongoos.connect(url).then(()=>{
    console.log("successfuly connected")
})


let {courses}=require('./data/courses')

const coursesRouter=require('./routes/coursesRoute')
const usersRouter=require('./routes/usersRoute')


app.use(cors())
app.use('/api/courses',coursesRouter)
app.use('/api/users',usersRouter)
app.all('*',(req,res,next)=>{
    res.json({status:httpStatusText.ERROR,message:'this resource is not avilable'})
})
//==========================

//==========================

app.listen(4000,()=>{
    console.log('app listen at port 4000')
    console.log(courses.find((courses)=>courses.id==1))
})