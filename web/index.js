function createRequest(){
    return new XMLHttpRequest();
}

function configuraRequestParaDadosImc(request, callback){
    request.onreadystatechange = callback;
    request.open('POST', 'http://localhost:3000/api/calculator');
    request.setRequestHeader("Content-Type", "application/json");
}

function capturaDadosForm(){
    let inputHeight = document.querySelector('input#altura');
    let inputWeight = document.querySelector('input#peso');

    let height = inputHeight.value;
    let weight = inputWeight.value;

    return{
        height, weight
    }
}

function renderImc(dados){
    document.getElementById("imc").innerText = `${dados.imc} - ${dados.imcDesc}`;
}


window.onload = function() {
    let btn = document.querySelector('.data .form button');
    btn.addEventListener('click', () => {
        let dados = capturaDadosForm();
        let req = createRequest();
        configuraRequestParaDadosImc(req, function () {
        if (this.readyState === 4 && this.status === 200) {
           renderImc(JSON.parse(this.responseText));
         }
        });
        req.send(JSON.stringify(dados));

    });
}