const urlBase = "https://restapi-deploy-demo-vsf8.onrender.com";
const lista = document.getElementById("alunos");
const form = document.getElementById("form-aluno");
const campoPesquisa = document.getElementById("pesquisa");

let alunoEditando = null;

// 💡 Alternância entre seções
function mostrarSecao(secao) {
  document.querySelectorAll(".secao").forEach(div => div.style.display = "none");
  document.getElementById("secao-" + secao).style.display = "block";

  if (secao === "alunos") carregarAlunos();
}

// Ativação da navegação
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const href = e.target.getAttribute("href").replace("#", "");
    mostrarSecao(href);
  });
});

// 🔍 Pesquisar
campoPesquisa.addEventListener("input", carregarAlunos);
document.getElementById("btnPesquisar").addEventListener("click", carregarAlunos);

// 🧠 Carregar alunos
function carregarAlunos() {
  fetch(`${urlBase}/alunos`)
    .then(res => res.json())
    .then(data => {
      const termo = campoPesquisa.value.toLowerCase();

      const filtrados = data
        .filter(a =>
          `${a.nome} ${a.apelido} ${a.curso}`.toLowerCase().includes(termo)
        )
        .sort((a, b) => a.nome.localeCompare(b.nome));

      lista.innerHTML = filtrados.map(a => `
        <div class="aluno-card" data-id="${a._id || a.id}">
          ${a.nome} ${a.apelido} - ${a.curso} (${a.anoCurricular}º ano)
          <div>
            <button class="btn-action btn-edit">Editar</button>
            <button class="btn-action btn-delete">Apagar</button>
          </div>
        </div>
      `).join('');

      // Botões
      document.querySelectorAll(".btn-delete").forEach(button => {
        button.addEventListener("click", e => {
          const id = e.target.closest('.aluno-card').dataset.id;
          removerAluno(id);
        });
      });

      document.querySelectorAll(".btn-edit").forEach(button => {
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
    })
    .catch(err => {
      console.error("❌ Erro ao carregar alunos:", err);
      lista.innerHTML = "<p>Erro ao carregar dados.</p>";
    });
}

// 🧹 Apagar aluno
function removerAluno(id) {
  if (!confirm("Deseja apagar este aluno?")) return;

  fetch(`${urlBase}/alunos/${id}`, { method: 'DELETE' })
    .then(() => carregarAlunos());
}

// 💾 Criar / Atualizar
form.addEventListener("submit", e => {
  e.preventDefault();

  const aluno = {
    nome: document.getElementById("nome").value,
    apelido: document.getElementById("apelido").value,
    curso: document.getElementById("curso").value,
    anoCurricular: parseInt(document.getElementById("ano").value)
  };

  const endpoint = alunoEditando ? `${urlBase}/alunos/${alunoEditando}` : `${urlBase}/alunos`;
  const metodo = alunoEditando ? "PUT" : "POST";

  fetch(endpoint, {
    method: metodo,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(aluno)
  })
    .then(res => {
      if (!res.ok) throw new Error("Erro ao salvar aluno");
      return res.json();
    })
    .then(() => {
      form.reset();
      alunoEditando = null;
      carregarAlunos();
    })
    .catch(err => {
      alert("Erro ao salvar aluno. Verifique os dados.");
      console.error(err);
    });
});

// Botão cancelar
document.querySelector(".btn-cancelar").addEventListener("click", () => {
  form.reset();
  alunoEditando = null;
});

// Início padrão
mostrarSecao("alunos");
