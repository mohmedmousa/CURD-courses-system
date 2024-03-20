const jwt=require('jsonwebtoken')
const httpStatusText=require('../utils/httpStatusText')
const verify_token=(req,res,next)=>{
    const authHeader=req.headers['Authorization'] || req.headers['authorization']
    if(!authHeader){
        return res.status(401).json({status:httpStatusText.FAIL,message:'token is requried'})
    }
    const token = authHeader.split(' ')[1]
    try{
        const currentuser=jwt.verify(token,process.env.JWT_SECRET_KEY)
        req.currentuser=currentuser
        next()
    }catch
    {
        return res.status(401).json({status:httpStatusText.FAIL,message:'invalid token'})
    }
    //console.log("verifedtoken",verifedtoken)
    
}

module.exports=verify_token