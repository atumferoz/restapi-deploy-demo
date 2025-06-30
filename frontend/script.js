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
  if (secao === "cursos") carregarCursos();
}

// Navegação
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
        .filter(a => `${a.nome} ${a.apelido} ${a.curso}`.toLowerCase().includes(termo))
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
  fetch(`${urlBase}/alunos/${id}`, { method: 'DELETE' }).then(() => carregarAlunos());
}

// 💾 Criar / Atualizar aluno
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

// Cancelar edição
document.querySelector(".btn-cancelar").addEventListener("click", () => {
  form.reset();
  alunoEditando = null;
});

// 🎓 Carregar cursos
function carregarCursos() {
  const listaCursos = document.getElementById("cursos");
  listaCursos.innerHTML = "<p>Carregando cursos...</p>";

  fetch(`${urlBase}/cursos`)
    .then(res => res.json())
    .then(data => {
      if (!data.length) {
        listaCursos.innerHTML = "<p>Nenhum curso encontrado.</p>";
        return;
      }

      listaCursos.innerHTML = data.map(curso => `
        <div class="aluno-card">
          <strong>${curso.nome}</strong><br>
          Código: ${curso.codigo}<br>
          Duração: ${curso.duracao} anos
        </div>
      `).join('');
    })
    .catch(err => {
      console.error("❌ Erro ao carregar cursos:", err);
      listaCursos.innerHTML = "<p>Erro ao carregar cursos.</p>";
    });
}

// 🎓 Formulário de Cursos
const formCurso = document.getElementById("form-curso");

formCurso.addEventListener("submit", e => {
  e.preventDefault();

  const curso = {
    nome: document.getElementById("nome-curso").value,
    codigo: document.getElementById("codigo-curso").value,
    duracao: parseInt(document.getElementById("duracao-curso").value)
  };

  fetch(`${urlBase}/cursos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(curso)
  })
    .then(res => {
      if (!res.ok) throw new Error("Erro ao salvar curso");
      return res.json();
    })
    .then(() => {
      formCurso.reset();
      carregarCursos();
    })
    .catch(err => {
      alert("Erro ao salvar curso.");
      console.error(err);
    });
});

// 🧽 Deletar curso
function deletarCurso(id) {
  if (!confirm("Deseja apagar este curso?")) return;

  fetch(`${urlBase}/cursos/${id}`, { method: "DELETE" })
    .then(() => carregarCursos());
}

// Atualizar a função carregarCursos
function carregarCursos() {
  const listaCursos = document.getElementById("cursos");
  listaCursos.innerHTML = "<p>Carregando cursos...</p>";

  fetch(`${urlBase}/cursos`)
    .then(res => res.json())
    .then(data => {
      if (!data.length) {
        listaCursos.innerHTML = "<p>Nenhum curso encontrado.</p>";
        return;
      }

      listaCursos.innerHTML = data.map(curso => `
        <div class="aluno-card">
          <strong>${curso.nome}</strong><br>
          Código: ${curso.codigo}<br>
          Duração: ${curso.duracao} anos
          <div style="margin-top: 10px;">
            <button class="btn-action btn-delete" onclick="deletarCurso('${curso._id}')">Apagar</button>
          </div>
        </div>
      `).join('');
    })
    .catch(err => {
      console.error("❌ Erro ao carregar cursos:", err);
      listaCursos.innerHTML = "<p>Erro ao carregar cursos.</p>";
    });
}


// Inicializar
mostrarSecao("alunos");
