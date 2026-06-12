const {body}=require('express-validator')

const registerValidator=[
    body('name').notEmpty().withMessage("Name required"),
    body('email').isEmail().withMessage('Email required'),
    body('password').isLength({min:6}).withMessage("Password must be of length 6+ characters"),
]

const loginValidator=[
    body('email').isEmail(),
    body('password').notEmpty(),
]

module.exports={registerValidator,loginValidator}