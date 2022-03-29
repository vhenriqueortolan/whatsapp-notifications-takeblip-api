const mongoose = require('mongoose')

const Disparo = new mongoose.Schema({
    atendente: String,
    departamento: String,
    mensagem: String,
    cliente: String,
    whatsapp: String,
    data: {
        type: Date,
        default: Date.now
    }
})

mongoose.model('disparo', Disparo)