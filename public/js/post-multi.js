async function sendMessage(){
    const nomeAgente = document.getElementById('nomeAgente').value
    const emailAgente = document.getElementById('emailAgente').value
    const mensagem = document.getElementById('mensagem').value
    const whatsCheck = document.getElementsByName('whatsapp')
    const clientCheck = document.getElementsByName('cliente')
    const ok = []
    const notOk = []
    const rowOk = []
    const rowNotOk = []
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
            if (post.data.status == "success"){
                console.log(post.data)
                ok.push(cliente)
                rowOk.push(`row${x}`)
            }
            else {
                console.log(post.data)
                const err = post.data.message
                const msgErr = `Mensagem para ${cliente} recebeu o erro: ${err} `
                notOk.push(msgErr)
                rowNotOk.push(`row${x}`)
            }
        }
        catch (err){
            console.log(err)
        }
    }    
    if (notOk.length > 0){
        window.alert(notOk)
        for (x = 0; x < rowNotOk; x++){
            document.getElementById(rowNotOk[x]).setAttribute("style", "background-color: red")
        }
        if (ok.length > 0){
            for (x = 0; x < rowOk.length; x++){
                document.getElementById(rowOk[x]).remove()
            }
            window.alert(`Mensagem para ${ok} enviada com sucesso`)
    }
    }
    else {
        window.alert(`Mensagem para ${ok} enviada com sucesso`)
        window.location.reload()
    }
}
