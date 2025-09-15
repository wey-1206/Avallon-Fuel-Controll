document.addEventListener("DOMContentLoaded", () => {
  const tabela = document.querySelector("#tabela_setor");
  const form = document.querySelector("#formSetor");

  // carregar setores na inicialização
  async function carregarSetores() {
    try {
      const res = await fetch("/setores");
      const setores = await res.json();
      tabela.innerHTML = ""; 
      setores.forEach((setor, i) => {
        tabela.insertAdjacentHTML("beforeend", `
          <tr>
            <th scope="row">${i + 1}</th>
            <td>${setor.nome}</td>
            <td><i class="bi bi-pencil-square"></i></td>
          </tr>
        `);
      });
    } catch (error) {
      showToast("Erro ao carregar setores", "danger");
    }
  }

  // cadastro de setor
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const nome = document.querySelector("#nome_setor").value;

    try {
      const res = await fetch("/setores/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome })
      });

      if (res.ok) {
        await res.json();
        showToast("Setor cadastrado com sucesso!", "success");
        form.reset();
        carregarSetores(); // recarrega a tabela
      } else {
        const err = await res.json();
        showToast(err.error || "Erro ao cadastrar setor", "danger");
      }
    } catch (error) {
      showToast("Erro de conexão com servidor", "danger");
    }
  });

  carregarSetores();
});