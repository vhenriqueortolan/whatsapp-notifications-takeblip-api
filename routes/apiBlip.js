const express = require('express')
const apiBlip = express.Router()
const axios = require('axios').default

apiBlip.post('/apiBlip', (req,res) => {
    console.log(req.body)
    const headers = {
        "Content-Type":"application/json",
        "Authorization":`${process.env.BLIPTOKEN}`
    }
    const sendMessage = async () => {
        try {
           const id = await axios.post(process.env.URI_BLIPCOMMAND, {
                "id": "{{$guid}}",
                "to": "postmaster@wa.gw.msging.net",
                "method": "get",
                "uri": `lime://wa.gw.msging.net/accounts/+55${req.body.whatsapp}`
                }, {headers: headers})
            if (id.data.status = "success") {
                const update = await axios.post(process.env.URI_BLIPCOMMAND, {
                    "id": "{{$guid}}",
                    "method": "merge",
                    "uri": "/contacts",
                    "type": "application/vnd.lime.contact+json",
                    "resource": {
                        "identity": id.data.resource.identity,
                        "name": req.body.cliente,
                        "group":"true",    
                        "extras": {
                            "UltimoAgente": req.body.emailAgente,
                            "TipodeAtendimento": "ativo"
                        },
                        "source": "WhatsApp"
                    }
                }, {headers: headers})
                if (update.data.status = "success") {
                    const name = await axios.post(process.env.URI_BLIPCOMMAND, {
                        "id": "{{$guid}}",
                        "to": "postmaster@msging.net",
                        "method": "set",
                        "uri": `/contexts/${id.data.resource.identity}/nameClient`,
                        "type": "text/plain",
                        "resource": req.body.cliente
                    }, {headers: headers})
                    if (name.data.status = "success") {
                        const msg = await axios.post(process.env.URI_BLIPMESSAGE, {
                            "id":"{{$guid}}",
                            "to": id.data.resource.identity,
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
                                                    "text": req.body.cliente
                                                },
                                                {
                                                    "type":"text",
                                                    "text": req.body.nomeAgente
                                                },
                                                {
                                                    "type":"text",
                                                    "text": req.body.mensagem
                                                }
                                            ]
                                        }
                                    ]
                                }
                            }
                        }, {headers: headers})
                        if (msg.status = 200) {
                            res.sendStatus(msg.status)
                        }
                        else {
                            console.log(msg.data)
                        }    
                    }
                    else {
                        console.log(name.data)
                    }
                }
                else {
                    console.log(update.data)
                }
            }
            else {
                console.log(id.data)
            }

        }
        catch (err) {
            console.log(err)
        }
    }
    sendMessage()
})

module.exports = apiBlip