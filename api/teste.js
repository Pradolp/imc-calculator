const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/health', (req, res) => {
    res.send("It's alive!");
})

// FUNCOES
function calculaImc(height, weight){
    let result = weight / (height ** 2);
    return Number(result.toFixed(2));
}

//tabela referencia
// 0: "Magreza",
// 18.5: "Normal",
// 24.9: "Sobrepeso",
// 29.9: "Obesidade"

function translateImc(imc){
    if (imc >= 29.9) return "Obesidade";
    if (imc >= 24.9) return "Sobrepeso";
    if (imc >= 18.5) return "Normal";
    return "Magreza";
}

app.get('/api/table', (req, res) => {
    const tbImc = {
        0: "Magreza",
        18.5: "Normal",
        24.9: "Sobrepeso",
        29.9: "Obesidade"
    };

//    res.send(JSON.stringify(tbImc));
    res.json(tbImc);
});

app.post('/api/calculator', (req, res) => {
    const {height, weight, teste} = req.body;

    const imc = calculaImc(height, weight);
    const imcDesc = translateImc(imc);

    const person = {
        height, weight, imc, imcDesc, teste
    }

    res.json(person)
});

app.listen(port, () => {
    console.log("Starting API REST with Express");
});