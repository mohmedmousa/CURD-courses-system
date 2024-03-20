const mongoos=require('mongoose')
const validator=require('validator')
const UserRoles = require('../utils/user_roles')
const user_schema=new mongoos.Schema({
    fristName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:[validator.isEmail,'filed must be avalid email']
    },
    password:{
        type:String,
        required:true
    },
    token:{
        type:String
    },
    role:{
        type:String,
        enum:[UserRoles.ADMIN,UserRoles.USER,UserRoles.MANEGER],
        default:UserRoles.USER
    },
    avatar:{
        type:String,
        default:'uploads/profile,jpg'
    }

})
module.exports=mongoos.model('user',user_schema)