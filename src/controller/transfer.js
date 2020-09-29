const transferModel = require('../model/transfer')

module.exports = {
    search: async function(req, res) {
        try {
            const { q } = req.query
            const result = await transferModel.search(q)
            if(result.length == 0) {
                res.status(404).send({
                    message: 'Data Not Found'
                })
            } else {
                res.status(200).send({
                    data: result
                })
            }
            
        } catch (error) {
            res.status(500).send({
                message: error.message
            })
        }
    },
    getTransfer: async function(req, res) {
        try {
            const result = await transferModel.getTransfer()
            res.status(200).send({
                data: result
            })
        } catch (error) {
            res.status(500).send({
                message: error.message
            })
        }
    },
    getTransferById: async function(req, res) {
        try {
            const { id } = req.params
            const result = await transferModel.getTransferById(id)
            if(result.length == 0) {
                res.status(404).send({
                    message: 'Data Not Found'
                })
            } else {
                res.status(200).send({
                    message: 'Success get a data',
                    data: result
                })
            }       
        } catch (error) {
            res.status(500).send({
                message: error.message
            })
        }
    },
    postTransfer: async function(req, res) {
        try {
            const { id } = req.params
            const setData = req.body
            const result = await transferModel.postTransfer(id, setData)
            res.status(201).send({
                message: 'Success created a transfer',
                data: result.affectedRows
            })
        } catch (error) {
            res.status(500).send({
                message: error.message
            })
        }
    },
    editTransfer: async function(req, res) {
        try {
            const { id } = req.params
            const setData = req.body
            const result = await transferModel.editTransfer(id, setData)
            res.status(201).send({
                message: 'Success edited a transfer',
                data: result.affectedRows
            })
        } catch (error) {
            res.status(500).send({
                message: error.message
            })
        }
    },
    deleteTransfer: async function(req, res) {
        try {
            const { id } = req.params
            await transferModel.deleteTransfer(id)
            res.status(200).send({
                message: 'Success delete a log transfer'
            })
        } catch (error) {
            res.status(500).send({
                message: error.message
            })
        }
    }
}