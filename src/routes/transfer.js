const transferController = require('../controller/transfer')
const router = require('express').Router()

router
    .get('/search', transferController.search)
    .get('/', transferController.getTransfer)
    .get('/:id', transferController.getTransferById)
    .post('/:id', transferController.postTransfer)
    .patch('/:id', transferController.editTransfer)
    .delete('/:id', transferController.deleteTransfer)

module.exports = router