const formMulti = document.getElementById('form-multi')

formMulti.addEventListener('submit', function(e){
    e.preventDefault();

var nome = document.getElementById('nome2').value
var mensagem = document.getElementById('mensagem2').value
var check = document.getElementsByName("departamento")
for (var i = 0; i < check.length; i++) {
    if (check[i].checked) {
        var departamento = check[i].value}}
var whatsCheck = document.getElementsByName('whatsapp')
var clientCheck = document.getElementsByName('nome')
for (var x = 0; x < whatsCheck.length; x++){
    var cliente = clientCheck[x].value
    var whatsapp = whatsCheck[x].value



    fetch('https://api.zenvia.com/v2/channels/whatsapp/messages', {
        method:'POST',
        headers: new Headers({
                    'Content-Type': 'application/json; charset="utf-8"',
                    "X-API-Token": "poS4oV1nn-SNunUoxL5ZdZlMJHsyVtmRNyUz" 
        }),
        body: JSON.stringify({
        "from": "555332250220",
        "to": whatsapp,
        "contents": 
            [{
            "type":"template",
            "templateId":"5f464592-b208-41fe-bc52-a5d776f783b6",
            "fields":   
                {"cliente": cliente,
                "atendente": nome,
                "departamento": departamento,
                "mensagem": mensagem
                }
            }],
        }),       
    }).then(function (response) {
        console.log(response.status)
    }).catch(function (error) {
        console.error(error);   
    })               
    const headers = new Headers()
    headers.append("Content-Type", "application/json")

    const body = {
    "cliente": cliente,
    "whatsapp": whatsapp,
    "atendente": nome,
    "departamento": departamento,
    "mensagem": mensagem
    }

    const options = {
    method: "POST",
    headers,
    mode: "cors",
    body: JSON.stringify(body),
    }

    fetch("https://disparar.herokuapp.com/save", options)

/*alert("Mensagem enviada ;D")
location.reload()
https://disparar.herokuapp.com/save
https://enkf6golqny2krb.m.pipedream.net
*/
}
const alert = document.getElementById('alert')
alert.style.visibility = 'visible'
setTimeout(function() {
    alert.style.transition = '.5s';
    alert.style.opacity = '0';
    alert.style.visibility = 'hidden';
    location.reload()
    }, 1250);
}
)