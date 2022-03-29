const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../models/Disparo')
const Disparo = mongoose.model('disparo')
require('../models/Contato')
const Contato = mongoose.model('contato')

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

router.post('/contato', (req,res) => {
        Contato.findOne({whatsapp: req.body.whatsapp}).then((contato) => {
            res.send(contato)
        }).catch((err) => {
            res.status(404).json({ status: 'not ok' })
        })
})

router.post('/novo-contato', (req,res) => {
        const novoContato = {
            cliente: req.body.cliente,
            whatsapp: req.body.whatsapp
        }
        new Contato(novoContato).save().then(() => {
            res.sendStatus(200)
        }).catch((err) => {
            res.send(err)
        })
})

module.exports = router