require('dotenv').config()

const app = require('express')()
const morgan = require('morgan')
const clc = require('cli-color')
const cors = require('cors')

const db = require('./db/mongoose.connection')
const record_router = require('./modules/record/record.router')

const { NODE_ENV,API_PORT,API_HOST } = process.env;

app.use(cors())

app.use(morgan('dev'))

app.use('/records', record_router);

// central error handling
app.use( (err, req, res, next) => {
    console.log(err)
  })
app.use( (err, req, res, next) => {
    if(NODE_ENV === 'production')
    res.status(500).json({error:'internal server error'})
    else
    res.status(500).json({error:err.message,stack:err.stack})
})
app.use( (err, req, res, next) => {
    //TODO log to file
})

//when no routes were matched...
app.use('*', (req, res) => {
    res.status(404).json({[req.url]:"not found"})
})

db.connect();

//start the express api server
app.listen(API_PORT,API_HOST, (error) => {
    if(error) console.log(error)
    else console.log(clc.magenta(`express api is live  ✨ ⚡ http://${API_HOST}:${API_PORT} ✨ ⚡`))
});



