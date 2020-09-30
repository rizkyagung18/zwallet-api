const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config()
const userRoute = require('./src/routes/user')
const transferRoute = require('./src/routes/transfer')
const topUpRoute = require('./src/routes/topup')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/users', userRoute)
app.use('/transfer', transferRoute)
app.use('/topup', topUpRoute)

app.listen(process.env.PORT, () => {
  console.log('Server listening on PORT 8000')
})