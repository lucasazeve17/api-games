const express = require('express')
const connection = require('./database/database')
const routes = require('./routes')
const cors = require('cors')
const app = express()

//Database
connection
    .authenticate()
    .then(() => {
        console.log('Conexão feita com sucesso')
    }).catch((err) => {
        console.log(err)
    })



app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

app.use(routes)



app.listen('3333')