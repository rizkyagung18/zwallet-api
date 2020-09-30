const mysql = require('mysql')

const conn = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB
})

conn.connect(err => {
    if(!err) {
        console.log('Connected to MySQL')
    }
})

module.exports = conn