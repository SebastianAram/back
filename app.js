const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors({
    origin: '*'
}))

const tipoEquipo = require('./routes/tipoEquipo')
const estadoEquipo = require('./routes/estadoEquipo')
const usuarioEquipo = require('./routes/usuarioEquipo')
const marcaEquipo = require('./routes/marcaEquipo')
const inventarioEquipo = require('./routes/inventarioEquipo')

app.use('/api/tipoequipos', tipoEquipo)
app.use('/api/estadoequipos', estadoEquipo)
app.use('/api/usuarioequipos', usuarioEquipo)
app.use('/api/marcaequipos', marcaEquipo)
app.use('/api/inventarioequipos', inventarioEquipo)


module.exports = app