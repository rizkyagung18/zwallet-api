const db = require('../config/mysql')

module.exports = {
    getAllUser: function() {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM users', (err, result) => {
                if(!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    getUserById: function(id) {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM users WHERE id=${id}`, (err, result) => {
                if(!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    postUser: function(setData) {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO users SET ?`, setData, (err, result) => {
                if(!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    editUser: function(id, setData) {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE users SET ? WHERE id=?`, [setData, id], (err, result) => {
                if(!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    deleteUser: function(id) {
        return new Promise((resolve, reject) => {
            db.query(`DELETE FROM users WHERE id=${id}`, (err, result) => {
                if(!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    }
}