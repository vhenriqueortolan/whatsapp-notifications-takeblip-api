const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../models/Disparo')
const Disparo = mongoose.model('disparo')

router.get('/', (req, res) => {
    res.render("../views/index")
})

router.post('/save', (req, res) => {
    const novoDisparo = {
        atendente: req.body.atendente,
        departamento: req.body.departamento,
        mensagem: req.body.mensagem,
        cliente: req.body.cliente,
        whatsapp: req.body.whatsapp
    }

    new Disparo(novoDisparo).save().then(() => {
        res.sendStatus(200)
    }).catch((err) => {
        res.send(err)
    })
})

router.post('/id', (req,res) => {
    Disparo.find({ whatsapp: req.body.whatsapp }).sort({ data: -1 }).limit(1).then((disparo) => {
        res.send(disparo[0])
    })
})
module.exports = router