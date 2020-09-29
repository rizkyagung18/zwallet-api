const mysql = require('mysql')

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'zwallet'
})

conn.connect(err => {
    if(!err) {
        console.log('Connected to MySQL')
    }
})

module.exports = conn