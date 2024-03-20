const express=require ('express')
const router =express.Router()

const coursesController=require('../controllers/courses_controllers')
const {validationschmea} = require('../middlewares/validationschema')
const verify_token = require('../middlewares/verify_token')
const allawedTo = require('../middlewares/allawedTo')
const UserRoles = require('../utils/user_roles')



router.route('/')
    .get(coursesController.getCourses)
    .post(validationschmea(),coursesController.addCourse)

router.route('/:courseId')
    .get(coursesController.getCourse)
    .patch(coursesController.updateCourse)
    .delete(verify_token,allawedTo(UserRoles.ADMIN,UserRoles.MANEGER), coursesController.deleteCoures)


module.exports=router