
const {body } = require('express-validator');
const validationschmea=()=>{
    return [ body('name')
    .notEmpty()
    .withMessage('name is required')
    .isLength({min:2})
    .withMessage('name must be more than one digit'),
    body("price").notEmpty().withMessage('price is required')
]
}
module.exports = {
    validationschmea
}