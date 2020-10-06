const router = require('express').Router()
const userController = require('../controller/user')
const { body } = require('express-validator')

router
    .get('/login', userController.login)
    .post('/register', [
        body('email', 'Must a valid email').isEmail()
        ]
        , userController.postUser)
    .get('/search/:id', userController.searchAll)
    .get('/search/receiver/:id', userController.searchOneById)
    .get('/', userController.getAllUser)
    .get('/:id', userController.getUserById)
    .patch('/:id', [
        body('email', 'Must a valid email').isEmail()
        ]
        , userController.editUser)
    .delete('/:id', userController.deleteUser)

module.exports = router