const db = require('../config/mysql')

module.exports = {
    login: function(email) {
        return new Promise((resolve, reject) => {
            db.query(`SELECT id AS token_id FROM users WHERE email='${email}'`, (err, result) => {
                if(!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
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
    searchAll: function(id) {
        return new Promise((resolve, reject) => {
            db.query('SELECT id AS user_id, name, phone, photo, balance FROM users WHERE id <> ? ORDER BY name ASC', id, (err, result) => {
                if(!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    searchOneById: function(id) {
        return new Promise((resolve, reject) => {
            db.query('SELECT id AS user_id, name, phone, photo, balance FROM users WHERE id = ?', id, (err, result) => {
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
                    db.query(`SELECT * FROM transfer WHERE id_sender = ${id} OR id_receiver = ${id}`, (err, res) => {
                        const newData = [
                            {
                                ...result[0],
                                history: res
                            }
                        ]
                        if(!err) {
                            resolve(newData)
                        } else {
                            reject(new Error(err))
                        }
                    })
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