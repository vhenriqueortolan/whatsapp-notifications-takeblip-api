// Carregando módulos
    const express = require('express')
    const handlebars = require('express-handlebars')
    const app = express()
    const index = require('./routes/index')
    const path = require('path')
    const mongoose = require('mongoose')

// Configurações
    // bodyParser
        app.use(express.urlencoded({extended: true}))
        app.use(express.json())
    // Handlebars
        app.engine('handlebars', handlebars({defaultLayout: 'main'}))
        app.set('view engine', 'handlebars')
    // Mongoose
        mongoose.Promise = global.Promise
        mongoose.connect('mongodb+srv://vhenriqueortolan:03051995@disparoapp.pfknb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
            useNewUrlParser: true, 
            useUnifiedTopology: true
        }).then(() => {
            console.log('Conectado')
        }).catch((err) => {
            console.log(err)
        }) 
    // Public
        app.use(express.static(path.join(__dirname, 'public')))

// Rotas
    app.use('/', index)
    
// Outros
const PORT = process.env.PORT || 8081
app.listen(PORT)
