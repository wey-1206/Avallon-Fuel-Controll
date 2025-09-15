document.addEventListener("DOMContentLoaded", () => {
  const tabela = document.querySelector("#tabela_combustivel");
  const form = document.querySelector("#formCombustivel");

  // Carregar combustíveis na inicialização
  async function carregarCombustiveis() {
    try {
      const res = await fetch("/combustiveis");
      if (!res.ok) {
        throw new Error(`Erro HTTP: ${res.status}`);
      }
      const combustiveis = await res.json();
      
      // Limpar a tabela antes de adicionar novos registros
      tabela.innerHTML = "";
      
      combustiveis.forEach((combustivel, i) => {
        tabela.insertAdjacentHTML("beforeend", `
          <tr>
            <th scope="row">${i + 1}</th>
            <td>${combustivel.nome}</td>
            <td><i class="bi bi-pencil-square"></i></td>
          </tr>
        `);
      });
    } catch (error) {
      console.error("Erro ao carregar combustíveis:", error);
      showToast("Erro ao carregar combustíveis", "danger");
    }
  }

  // Cadastro de combustível
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const nome = document.querySelector("#nome_combustivel").value;

    try {
      const res = await fetch("/combustiveis/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome })
      });

      if (res.ok) {
        await res.json();
        showToast("Combustível cadastrado com sucesso!", "success");
        form.reset();
        await carregarCombustiveis(); // Recarrega a tabela
      } else {
        const err = await res.json();
        showToast(err.error || "Erro ao cadastrar combustível", "danger");
      }
    } catch (error) {
      console.error("Erro ao cadastrar combustível:", error);
      showToast("Erro de conexão com o servidor", "danger");
    }
  });

  carregarCombustiveis();
});