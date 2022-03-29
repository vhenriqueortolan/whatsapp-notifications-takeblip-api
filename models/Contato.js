const mongoose = require('mongoose')

const Contato = new mongoose.Schema({
    cliente: String,
    whatsapp: String,
})

mongoose.model('contato', Contato)