// Carregando módulos
    const express = require('express')
    const handlebars = require('express-handlebars')
    const app = express()
    const index = require('./routes/index')
    const path = require('path')
    //const mongoose = require('mongoose')

// Configurações
    // bodyParser
        app.use(express.urlencoded({extended: true}))
        app.use(express.json())
    // Handlebars
        app.engine('handlebars', handlebars({defaultLayout: 'main'}))
        app.set('view engine', 'handlebars')
    // Mongoose

    // Public
        app.use(express.static(path.join(__dirname, 'public')))

// Rotas
    app.use('/', index)
// Outros
const PORT = 8081
app.listen(PORT, () => {
    console.log('Servidor rodando')
})
