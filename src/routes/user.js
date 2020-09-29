const router = require('express').Router()
const userController = require('../controller/user')
const { body } = require('express-validator')

router
    .get('/', userController.getAllUser)
    .get('/:id', userController.getUserById)
    .post('/', [
        body('email', 'Must a valid email').isEmail()
        ]
        , userController.postUser)
    .patch('/:id', userController.editUser)
    .delete('/:id', userController.deleteUser)

module.exports = router