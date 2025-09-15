document.addEventListener("DOMContentLoaded", () => {
  const tabela = document.querySelector("#tabela_fornecedor");
  const form = document.querySelector("#formFornecedor");

  // carregar fornecedor na inicialização
  async function carregarFornecedores() {
    try {
      const res = await fetch("/fornecedores");
      const fornecedores = await res.json();
      tabela.innerHTML = ""; 
      fornecedores.forEach((fornecedor, i) => {
        tabela.insertAdjacentHTML("beforeend", `
          <tr>
            <th scope="row">${i + 1}</th>
            <td>${fornecedor.nome}</td>
            <td><i class="bi bi-pencil-square"></i></td>
          </tr>
        `);
      });
    } catch (error) {
      showToast("Erro ao carregar fornecedores", "danger");
    }
  }

  // cadastro de fornecedor
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const nome = document.querySelector("#nome_fornecedor").value;

    try {
      const res = await fetch("/fornecedores/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome })
      });

      if (res.ok) {
        await res.json();
        showToast("Fornecedor cadastrado com sucesso!", "success");
        form.reset();
        carregarFornecedores(); // recarrega a tabela
      } else {
        const err = await res.json();
        showToast(err.error || "Erro ao cadastrar fornecedor", "danger");
      }
    } catch (error) {
      showToast("Erro de conexão com servidor", "danger");
    }
  });

  carregarFornecedores();
});