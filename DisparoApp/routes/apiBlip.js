require("dotenv").config()
const express = require('express')
const apiBlip = express.Router()
const axios = require('axios');

apiBlip.post('/apiBlip', (req,res) => {
    async function sendMessage() {
        try {
           const id = await axios.post({
                "id": "{{$guid}}",
                "to": "postmaster@wa.gw.msging.net",
                "method": "get",
                "uri": `"lime://wa.gw.msging.net/accounts/+55${req.body.whatsapp}"`
                })
            if (id.status = "success") {
                const update = await axios.post({
                    "id": "{{$guid}}",
                    "method": "merge",
                    "uri": "/contacts",
                    "type": "application/vnd.lime.contact+json",
                    "resource": {
                        "identity": `"${id.resource.identity}"`,
                        "name": `"${req.body.cliente}"`,
                        "group":"true",    
                        "extras": {
                            "ultimoAgente":`"${req.body.agente}"`,
                            "tipoDeNegociacao": "Contato Ativo"
                        },
                        "source": "whatsapp"
                    }
                })
                if (update.status = "success") {
                    const send = await axios.post({
                        "id":"{{$guid}}",
                        "to":"555399278087@wa.gw.msging.net",
                        "type":"application/json",
                        "content":{
                            "type":"template",
                            "template":{
                                "namespace":"cd2a6729_88b9_45b7_8228_5828ab07bbdc",
                                "name":"simples",
                                "language":{
                                    "code":"pt_BR",
                                    "policy":"deterministic"
                                },
                                "components":[
                                    {
                                        "type": "body",
                                        "parameters": [
                                            {
                                                "type": "text",
                                                "text": "Victor"
                                            },
                                            {
                                                "type":"text",
                                                "text":"Elis"
                                            },
                                            {
                                                "type":"text",
                                                "text":"sobre seu interesse em alugar um imóvel"
                                            }
                                        ]
                                    }
                                ]
                            }
                        }
                    })
                }
            }

        }
        catch {

        }
    }
})