
const listanomes = document.getElementById("listanomes");

async function mostranomes() {
    listanomes.innerHTML = "";
    resposta = await fetch("http://localhost:3000/nomes");
    nomes = await resposta.json();
    for (cadanome of nomes) {
        novop = document.createElement("p");
        novop.innerHTML = cadanome.nome
        listanomes.appendChild(novop)
    }
}

mostranomes();