const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()

const userRoute = require('./src/routes/user')
const transferRoute = require('./src/routes/transfer')
const topUpRoute = require('./src/routes/topup')

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/users', userRoute)
app.use('/transfer', transferRoute)
app.use('/topup', topUpRoute)

app.listen(process.env.PORT, () => {
  console.log('Server listening on PORT 8000')
})

// mysql --host=us-cdbr-east-02.cleardb.com --user=b5ce5c6503279e --password=ff9b9806 --reconnect heroku_073c4d186c5436b