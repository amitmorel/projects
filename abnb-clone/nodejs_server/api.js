const express = require('express')
const app = express()
const morgan = require('morgan')
const clc = require('cli-color')
const cors = require('cors')

const db = require('./db/mongoose.connection')
const house_router = require('./routes/house.router')

const port =  process.env.PORT || 4000

app.use(cors())

app.use(morgan('dev'))

app.use('/houses', house_router);

app.use('*', (req, res) => {
    res.status(404).send('<h1>nothing here ...</h1>')
})

db.connect();

//start the express api server
app.listen(port, (error) => {
    if(error) console.log(error)
    
});


//else console.log(clc.magenta(`express api is live  ✨ ⚡ http://localhost:${port} ✨ ⚡`))
