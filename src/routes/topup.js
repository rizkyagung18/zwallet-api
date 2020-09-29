const topupController = require('../controller/topup')
const router = require('express').Router()

router
    .get('/', topupController.getAllTopUp)
    .get('/:order', topupController.getTopUpByOrder)
    .post('/', topupController.postTopUp)
    .patch('/:order', topupController.editTopUp)
    .delete('/:order', topupController.deleteTopUp)

module.exports = router