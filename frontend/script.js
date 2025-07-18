const urlBase = "https://restapi-deploy-demo-vsf8.onrender.com";
const lista = document.getElementById("alunos");
const form = document.getElementById("form-aluno");
const campoPesquisa = document.getElementById("pesquisa");
let alunoEditando = null;

// Section management
function mostrarSecao(sec) {
  document.querySelectorAll(".secao").forEach(d => d.style.display = "none");
  document.getElementById("secao-" + sec).style.display = "block";

  if (sec === "alunos") {
    carregarAlunos();
    atualizarDropdownCursos(); 
  }
  if (sec === "cursos") {
    carregarCursos();
    atualizarDropdownCursos();
  }
}


// Navigation and search event listeners
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    mostrarSecao(e.target.getAttribute("href").slice(1));
  });
});

campoPesquisa.addEventListener("input", carregarAlunos);
document.getElementById("btnPesquisar").addEventListener("click", carregarAlunos);
function carregarAlunos() {
  fetch(`${urlBase}/aluno`)
    .then(res => {
      if (!res.ok) throw new Error("Erro ao buscar alunos");
      return res.json();
    })
    .then(data => {
      console.log("🔍 Alunos carregados:", data);

      const termo = campoPesquisa.value.trim().toLowerCase();
      const filtrados = termo
        ? data.filter(a =>
            `${a.nome} ${a.apelido} ${a.curso?.nome}`.toLowerCase().includes(termo)
          )
        : data;

      lista.innerHTML = filtrados.map(a => `
        <div class="aluno-card" 
             data-id="${a._id}" 
             data-nome="${a.nome}" 
             data-apelido="${a.apelido}" 
             data-curso="${a.curso?._id}" 
             data-ano="${a.anoCurricular}">
          ${a.nome} ${a.apelido} - ${a.curso?.nome || 'Sem curso'} (${a.anoCurricular}º ano)
          <div>
            <button class="btn-action btn-edit">Editar</button>
            <button class="btn-action btn-delete">Apagar</button>
          </div>
        </div>
      `).join('');

      // Delete handler
      document.querySelectorAll(".btn-delete").forEach(btn =>
        btn.addEventListener("click", e => {
          const id = e.target.closest('.aluno-card').dataset.id;
          if (confirm("Deseja apagar este aluno?")) {
            fetch(`${urlBase}/aluno/${id}`, { method: 'DELETE' })
              .then(() => carregarAlunos());
          }
        })
      );

      // Edit handler ✅
      document.querySelectorAll(".btn-edit").forEach(btn =>
        btn.addEventListener("click", e => {
          const div = e.target.closest('.aluno-card');

          document.getElementById("nome").value = div.dataset.nome;
          document.getElementById("apelido").value = div.dataset.apelido;
          document.getElementById("ano").value = div.dataset.ano;
          document.getElementById("curso").value = div.dataset.curso;

          alunoEditando = div.dataset.id;
        })
      );
    })
    .catch(err => {
      console.error("❌ Erro ao carregar alunos:", err);
      lista.innerHTML = "<p>Erro ao carregar dados.</p>";
    });
}


form.addEventListener("submit", e => {
  e.preventDefault();
  const aluno = {
    nome: document.getElementById("nome").value,
    apelido: document.getElementById("apelido").value,
    curso: document.getElementById("curso").value,
    anoCurricular: parseInt(document.getElementById("ano").value),
  };
  const endpoint = alunoEditando
    ? `${urlBase}/aluno/${alunoEditando}` : `${urlBase}/aluno`;
  const method = alunoEditando ? "PUT" : "POST";

  fetch(endpoint, {
    method, headers: { "Content-Type": "application/json" },
    body: JSON.stringify(aluno)
  })
    .then(res => {
      if (!res.ok) throw new Error('Erro ao salvar aluno');
      return res.json();
    })
    .then(() => {
      form.reset(); alunoEditando = null;
      carregarAlunos();
    })
    .catch(err => {
      console.error(err);
      alert("Erro ao salvar aluno.");
    });
});

document.querySelector(".btn-cancelar").addEventListener("click", () => {
  form.reset(); alunoEditando = null;
});

function carregarCursos() {
  const lc = document.getElementById("cursos");
  lc.innerHTML = "<p>Carregando cursos...</p>";
  fetch(`${urlBase}/curso`)
    .then(r => r.json())
    .then(data => {
      if (!data.length) lc.innerHTML = "<p>Nenhum curso encontrado.</p>";
      else {
        lc.innerHTML = data.map(c => `
          <div class="aluno-card">
            <strong>${c.nome}</strong><br>
            Código: ${c.codigo || c.id || '—'}<br>
            Duração: ${c.duracao || '—'} anos
            <div style="margin-top:10px;">
              <button class="btn-action btn-delete" onclick="deletarCurso('${c._id}')">Apagar</button>
            </div>
          </div>
        `).join('');
      }
    })
    .catch(err => {
      console.error(err);
      document.getElementById("cursos").innerHTML = "<p>Erro ao carregar cursos.</p>";
    });
}

document.getElementById("form-curso").addEventListener("submit", e => {
  e.preventDefault();

  const curso = {
    nome: document.getElementById("nome-curso").value,
    codigo: document.getElementById("codigo-curso").value,
    duracao: parseInt(document.getElementById("duracao-curso").value),
  };

  fetch(`${urlBase}/curso`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(curso)
  })
    .then(res => {
      if (!res.ok) throw new Error("Erro ao salvar curso");
      return res.json();
    })
    .then(() => {
      document.getElementById("form-curso").reset();
      carregarCursos(); // ✅ Refresh list
      atualizarDropdownCursos(); // ✅ Update dropdown
    })
    .catch(err => {
      console.error(err);
      alert("Erro ao salvar curso.");
    });
});


function deletarCurso(id) {
  if (!confirm("Deseja apagar este curso?")) return;
  fetch(`${urlBase}/curso/${id}`, { method: "DELETE" })
    .then(() => {
      carregarCursos();
      atualizarDropdownCursos();
    });
}

function atualizarDropdownCursos() {
  const select = document.getElementById("curso");
  fetch(`${urlBase}/curso`)
    .then(r => r.json())
    .then(cursos => {
      select.innerHTML = "";
      cursos
        .sort((a, b) => a.nome.localeCompare(b.nome))
        .forEach(c => {
          const opt = document.createElement("option");
          opt.value = c._id;
          opt.textContent = c.nome;
          select.appendChild(opt);
        });
    })
    .catch(err => console.error(err));
}

// Initialize
mostrarSecao("alunos");
