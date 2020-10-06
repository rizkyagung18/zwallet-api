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
    login: async function(req, res) {
        try {
            const { email } = req.query
            const result = await userModel.login(email)
            if(result) {
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
                        lastName: ' '
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
    searchAll: async function(req, res) {
        try {
            const { id } = req.params
            const result = await userModel.searchAll(id)
            res.status(200).send({
                data: result
            })
        } catch (error) {
            res.status(500).send({
                message: error.message
            })
        }
    },
    searchOneById: async function(req, res) {
        try {
            const { id } = req.params
            const result = await userModel.searchOneById(id)
            res.status(200).send({
                data: result
            })
        } catch (error) {
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
                            lastName: ' '
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
            if(req.body.email) {
                const errors = myValidationResult(req).array()
                if(errors.length) {
                    res.send('You should use a valid email')
                }
            }
            const currentPassword = req.query.password
            const { id } = req.params
            let setData = req.body
            if(req.body.password) {
                const res = await userModel.getUserById(id)
                const currPassword = res[0].password
                const check = bcrypt.compareSync(currentPassword, currPassword)
                console.log(check)
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