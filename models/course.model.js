const mongoos=require('mongoose')
const course_schema=new mongoos.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    }
})
module.exports=mongoos.model('Course',course_schema)