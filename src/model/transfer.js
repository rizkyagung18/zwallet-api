const db = require('../config/mysql')

module.exports = {
    search: function(q) {
        return new Promise((resolve, reject) => {
            db.query(`SELECT id AS user_id, name, phone, photo FROM users WHERE name LIKE '${q}%' ORDER BY name ASC`, (err, result) => {
                if(!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    getTransfer: function() {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM transfer', (err, result) => {
                if(!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    getTransferById: function(id) {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM transfer WHERE id=${id}`, (err, result) => {
                if(!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    postTransfer: function(id, setData) {
        return new Promise((resolve, reject) => {
            db.query(`SELECT id AS id_receiver, name AS receiver FROM users WHERE id=${id}`, (err, result) => {
                if(!err) {
                    const newData = {
                        ...setData,
                        ...result[0]
                    }
                    db.query(`INSERT INTO transfer SET ?`, newData, (err, result) => {
                        if(!err) {
                            resolve(result)
                        } else {
                            reject(new Error(err))
                        }
                    })
                }
            })
        })
    },
    editTransfer: function(id, setData) {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE transfer SET ? WHERE id=?`, [setData, id], (err, result) => {
                if(!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    deleteTransfer: function(id) {
        return new Promise((resolve, reject) => {
            db.query(`DELETE FROM transfer WHERE id=${id}`, (err, result) => {
                if(!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    }
}