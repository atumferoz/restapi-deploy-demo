// frontend/script.js
const url = "http://localhost:3000/alunos";
const lista = document.getElementById("alunos");
const form = document.getElementById("form-aluno");

function carregarAlunos() {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      lista.innerHTML = data.map(a => `
        <div>
          ${a.nome} ${a.apelido} - ${a.curso} (${a.anoCurricular}º ano)
          <button onclick="removerAluno(${a.id})">Apagar</button>
        </div>
      `).join('');
    });
}

function removerAluno(id) {
  fetch(`${url}/${id}`, { method: 'DELETE' })
    .then(() => carregarAlunos());
}

form.addEventListener("submit", e => {
  e.preventDefault();
  const aluno = {
    nome: form.nome.value,
    apelido: form.apelido.value,
    curso: form.curso.value,
    anoCurricular: parseInt(form.ano.value)
  };
  fetch(url, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(aluno)
  }).then(() => {
    form.reset();
    carregarAlunos();
  });
});

carregarAlunos();