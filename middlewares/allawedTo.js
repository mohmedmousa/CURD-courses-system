const httpStatusText=require('../utils/httpStatusText')
module.exports=(...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.currentuser.role)){
            return next(res.status(400).json({status:httpStatusText.FAIL,message:"this role is not authorized"}))
        }
        next()
    }
}