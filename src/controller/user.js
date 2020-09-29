const userModel = require('../model/user')
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')

const myValidationResult = validationResult.withDefaults({
    formatter: (error) => {
        return {
            error: error.location
        }
    }
})

module.exports = {
    getAllUser: async function(req, res) {
        try {
            const result = await userModel.getAllUser()
            const newData = result.map(data => {
                if(data.name.split(' ').length > 1) {
                    const separateName = data.name.split(' ')
                    const [firstName, lastName] = separateName
                    return {
                        ...data,
                        firstName,
                        lastName
                    }
                } else {
                    const firstName = data.name
                    return {
                        ...data,
                        firstName,
                        lastName: ''
                    }
                }
            })
            res.status(200).send({
                message: 'Success get all of user',
                data : newData
            })
        } catch(error) {
            res.status(500).send({
                message: error.message
            })
        }
    },
    getUserById: async function(req, res) {
        try {
            const { id } = req.params
            const result = await userModel.getUserById(id)
            if(result.length == 0) {
                res.status(404).send({
                    message: 'Data Not Found'
                })
            } else {
                const newData = result.map(data => {
                    if(data.name.split(' ').length > 1) {
                        const separateName = data.name.split(' ')
                        const [firstName, ...lastName] = separateName
                        return {
                            ...data,
                            firstName,
                            lastName: lastName.join(' ')
                        }
                    } else {
                        const firstName = data.name
                        return {
                            ...data,
                            firstName,
                            lastName: ''
                        }
                    }
                })
                res.status(200).send({
                    message: 'Success get data',
                    data: newData
                })
            }
        } catch(error) {
            res.status(500).send({
                message: error.message
            })
        }
    },
    postUser: async function(req, res) {
        try {
            const errors = myValidationResult(req).array()
            if(errors.length == 0) {
                const hash = bcrypt.hashSync(req.body.password, 6)
                const setData = {
                    ...req.body,
                    password: hash
                }
                const result = await userModel.postUser(setData)
                res.status(201).send({
                    message: 'Success created an user',
                    rowsAffected: result.affectedRows
                })
            } else {
                res.send({
                    message: 'You should use a valid email'
                })
            }
        } catch (error) {
            res.status(500).send({
                message: error.message
            })
        }
    },
    editUser: async function(req, res) {
        try {
            const { id } = req.params
            let setData = req.body
            if(req.body.password) {
                const hash = bcrypt.hashSync(req.body.password, 10)
                setData = {
                    ...req.body,
                    password: hash
                }
            }
            const result = await userModel.editUser(id, setData)
            res.status(201).send({
                message: 'Success edited an user',
                rowsAffected: result.affectedRows
            })
        } catch (error) {
            res.status(500).send({
                message: error.message
            })
        }
    },
    deleteUser: async function(req, res) {
        try {
            const { id } = req.params
            await userModel.deleteUser(id)
            res.status(200).send({
                message: 'Success delete an user'
            })
        } catch (error) {
            res.status(500).send({
                message: error.message
            })
        }
    } 
    
}