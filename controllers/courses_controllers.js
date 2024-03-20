
const e = require('express');
const Course=require('../models/course.model')
const {validationResult } = require('express-validator')
const httpStatusText=require('../utils/httpStatusText')
const asyncHandler = require('express-async-handler')

const getCourses=asyncHandler(async (req,res)=> {
    const query=req.query
    console.log('qurey :  ',query)
    const limit=query.limit || 3
    const page=query.page || 1
    const skip=(page-1)*limit
    const courses= await Course.find({},{__v:0}).limit(limit).skip(skip)
     res.json({status:httpStatusText.SUCCSES,data:{courses}})
})

const getCourse=asyncHandler(async(req,res)=> {
    //try{
    const course=await Course.findById(req.params.courseId)

    if(!course){
        res.status(404).json({status:httpStatusText.FAIL,data:{course:null}})
    }
    return res.json({status:httpStatusText.SUCCSES,data:{course}})
//}
//catch(err){
  //  return res.status(400).json({status:httpStatusText.ERROR,data:null,message:err.message,code:400})
//}
})

const addCourse=asyncHandler(async(req,res)=>{
    const errors=validationResult(req)
    console.log('errors' , errors)
    if(!errors.isEmpty()){
        return res.status(400).json({status:httpStatusText.FAIL,data:errors.array()})
    }
    const newcourse=new Course(req.body)
    await newcourse.save()
    res.status(201).json({status:httpStatusText.SUCCSES,data:newcourse})
})

const updateCourse=asyncHandler(async(req,res)=>{
    try{
        const courseId=req.params.courseId
        console.log(courseId)
        const updatedcourse=await Course.updateOne({_id:courseId},{$set:{...req.body}})
        res.status(200).json({status:httpStatusText.SUCCSES,data:updatedcourse})
}   catch(e){
    return res.status(400).json({status:httpStatusText.ERROR, messagee:e.message()})
}
    })
    
const deleteCoures=asyncHandler(async(req,res)=>{
    const courseId=req.params.courseId
    await Course.deleteOne({_id:courseId})
    res.status(200).json({status:httpStatusText.SUCCSES,data:null})
})


module.exports={
    getCourses,
    getCourse,
    addCourse,
    updateCourse,
    deleteCoures
}