const User=require('../models/user.model')
const asyncHandler = require('express-async-handler')
const httpStatusText=require('../utils/httpStatusText')
const bcrypt=require('bcryptjs')
const jwt = require('jsonwebtoken');
const generat_jwt = require('../utils/generat_jwt');


const getallusers= asyncHandler(async (req,res)=> {
    const query=req.query
    const limit=query.limit || 3
    const page=query.page || 1
    const skip=(page-1)*limit
    const users= await User.find({},{__v:0,password:0}).limit(limit).skip(skip)
     res.json({status:httpStatusText.SUCCSES,data:{users}})
})

const register = asyncHandler(async(req,res)=> {
    const {fristName,lastName,email,password,role}=req.body
    //console.log('req.body====> ',req.body)
    const olduser=await User.findOne({email:email})
    if(olduser){
        await res.status(400).json({status:httpStatusText.FAIL,message:'email is aleady exists'})
    }
    const hashedPassword=await bcrypt.hash(password,8)
    const newUser=new User({
        fristName,
        lastName,
        email,
        password:hashedPassword,
        role,
        avatar:req.file.filename
    })
    const token = await generat_jwt({email:newUser.email,id:newUser._id,role:newUser.role})
    newUser.token=token

    await newUser.save()
    res.status(201).json({status:httpStatusText.SUCCSES,data:newUser})


})

const login = asyncHandler(async(req,res)=>{
    const {email,password}=req.body
    console.log(req.body)
    if(!email && !password){
        return res.status(400).json({status:httpStatusText.FAIL,message:'the email and password is required'})
    }
    const user=await User.findOne({email:email})
    if(!user){
        return res.status(400).json({status:httpStatusText.FAIL,message:'this email isnt exists'})
    }
    const correctPassword=await bcrypt.compare(password,user.password)
    //console.log(correctPassword)
    if(correctPassword){
        const token =await generat_jwt({email:user.email,id:user._id,role:user.role})
        return res.status(201).json({status:httpStatusText.SUCCSES,data:{token}})
    }else{
        return res.status(400).json({status:httpStatusText.FAIL,message:'the email or password is wrong'})

    }
})


module.exports={
    getallusers,
    register,
    login
}