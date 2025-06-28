const url = "https://restapi-deploy-demo-vsf8.onrender.com";
const lista = document.getElementById("alunos");
const form = document.getElementById("form-aluno");

let alunoEditando = null;
const campoPesquisa = document.getElementById("pesquisa");

function carregarAlunos() {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      const termo = campoPesquisa.value.toLowerCase();

      const filtrados = data
        .filter(a =>
          `${a.nome} ${a.apelido} ${a.curso}`.toLowerCase().includes(termo)
        )
        .sort((a, b) => a.nome.localeCompare(b.nome));

      function destacar(texto, termo) {
        if (!termo) return texto;
        const regex = new RegExp(`(${termo})`, 'gi');
        return texto.replace(regex, '<mark>$1</mark>');
      }

      lista.innerHTML = filtrados.map(a => {
        const nome = destacar(a.nome, termo);
        const apelido = destacar(a.apelido, termo);
        const curso = destacar(a.curso, termo);

        return `
          <div class="aluno-card" data-id="${a.id}">
            ${nome} ${apelido} - ${curso} (${a.anoCurricular}º ano)
            <div>
              <button class="btn-editar">Editar</button>
              <button class="btn-apagar">Apagar</button>
            </div>
          </div>
        `;
      }).join('');

      // Botões apagar
      document.querySelectorAll(".btn-apagar").forEach(button => {
        button.addEventListener("click", e => {
          const id = e.target.closest('.aluno-card').dataset.id;
          removerAluno(id);
        });
      });

      // Botões editar
      document.querySelectorAll(".btn-editar").forEach(button => {
        button.addEventListener("click", e => {
          const div = e.target.closest('.aluno-card');
          const id = div.dataset.id;
          const texto = div.firstChild.textContent;
          const regex = /(.+?) (.+?) - (.+?) \((\d+)/;
          const [, nome, apelido, curso, ano] = texto.match(regex);

          document.getElementById("nome").value = nome;
          document.getElementById("apelido").value = apelido;
          document.getElementById("curso").value = curso;
          document.getElementById("ano").value = ano;

          alunoEditando = id;
        });
      });
    });
}

campoPesquisa.addEventListener("input", carregarAlunos);

function removerAluno(id) {
  fetch(`${url}/${id}`, { method: 'DELETE' })
    .then(() => carregarAlunos());
}

form.addEventListener("submit", e => {
  e.preventDefault();
  const aluno = {
    nome: document.getElementById("nome").value,
    apelido: document.getElementById("apelido").value,
    curso: document.getElementById("curso").value,
    anoCurricular: parseInt(document.getElementById("ano").value)
  };

  const endpoint = alunoEditando ? `${url}/${alunoEditando}` : url;
  const metodo = alunoEditando ? "PUT" : "POST";

  fetch(endpoint, {
    method: metodo,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(aluno)
  }).then(() => {
    form.reset();
    alunoEditando = null;
    carregarAlunos();
  });
});

carregarAlunos();
