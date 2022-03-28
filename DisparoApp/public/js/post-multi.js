async function sendMessage(){
    document.getElementById("form").addEventListener("submit", function(event){
        event.preventDefault()
    })
    const nomeAgente = document.getElementById('nomeAgente').value
    const emailAgente = document.getElementById('emailAgente').value
    const mensagem = document.getElementById('mensagem').value
    const whatsCheck = document.getElementsByName('whatsapp')
    const clientCheck = document.getElementsByName('cliente')
    var alertMsg = []
    for (var x = 0; x < whatsCheck.length; x++){
        const cliente = clientCheck[x].value
        const whatsapp = whatsCheck[x].value

        try {
            const post = await axios.post('/apiBlip', {
                "nomeAgente": nomeAgente,
                "emailAgente": emailAgente,
                "cliente": cliente,
                "whatsapp": whatsapp,
                "mensagem": mensagem
            })
            if (post.status = "OK"){
                alertMsg.push(cliente)
            }
        }
        catch (err){
            console.log(err)
        }
    }
    window.alert(`Mensagem para ${alertMsg} enviada com sucesso`)
    window.location.reload()
    }
