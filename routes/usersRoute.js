const express=require('express')
const router=express.Router()
const userscontroller=require('../controllers/users.controllers')
const verify_token=require('../middlewares/verify_token')
const multer  = require('multer')
const httpStatusText=require('../utils/httpStatusText')
const diskStorage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads')
    },
    filename:(req,file,cb)=>{
        const ext=file.mimetype.split("/")[1]
        const filename=`photo_${Date.now()}.${ext}`
        cb(null,filename)
    }
})
const filefilter=(req,file,cb)=>{
    const imagetype=file.mimetype.split('/')[0]
    if(imagetype==='image'){
        return cb(null,true)
    }else{
        return cb('file must be image',false)
    }
}
const upload = multer({
     storage:diskStorage,
     fileFilter:filefilter
     })

router.route('/')
                .get(verify_token,userscontroller.getallusers)
router.route('/register')
                .post(upload.single('avatar'), userscontroller.register)
router.route('/login')
                .post(userscontroller.login)



module.exports=router