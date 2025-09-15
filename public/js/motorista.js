document.addEventListener("DOMContentLoaded", () => {
  const tabela = document.querySelector("#tabela_motorista");
  const select_setores = document.querySelector("#setor_id");
  const form = document.querySelector("#formMotorista");

  // carregar setores na inicialização
 async function carregarMotoristas() {
  try {
    // Buscar motoristas
    const resMotoristas = await fetch("/motoristas");
    if (!resMotoristas.ok) {
      throw new Error(`Erro HTTP: ${resMotoristas.status}`);
    }
    const motoristas = await resMotoristas.json();

    // Buscar setores
    const resSetores = await fetch("/setores");
    if (!resSetores.ok) {
      throw new Error(`Erro HTTP: ${resSetores.status}`);
    }
    const setores = await resSetores.json();

    // Preencher tabela de motoristas
    tabela.innerHTML = "";
    motoristas.forEach((motorista, i) => {
      // Encontrar o setor correspondente ao motorista
      const setor = setores.find(s => s.id === motorista.setor_id);
      const nomeSetor = setor ? setor.nome : "Sem setor";
      
      tabela.insertAdjacentHTML("beforeend", `
        <tr>
          <th scope="row">${i + 1}</th>
          <td>${motorista.nome}</td>
          <td>${nomeSetor}</td>
          <td><i class="bi bi-pencil-square"></i></td>
        </tr>
      `);
    });

    // Preencher select de setores
    select_setores.innerHTML = '<option hidden value=""></option>';
    setores.forEach(setor => {
      select_setores.insertAdjacentHTML("beforeend", `
        <option value="${setor.id}">${setor.nome}</option>
      `);
    });

  } catch (error) {
    console.error("Erro ao carregar motoristas ou setores:", error);
    showToast("Erro ao carregar motoristas ou setores", "danger");
  }
}

  // cadastro de motorista
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const nome = document.querySelector("#nome_motorista").value;
    const setor_id = document.querySelector("#setor_id").value;
                    
    try {
      const res = await fetch("/motoristas/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, setor_id })
      });

      if (res.ok) {
        await res.json();
        showToast("Motorista cadastrado com sucesso!", "success");
        form.reset();
        carregarMotoristas(); // recarrega a tabela
      } else {
        const err = await res.json();
        showToast(err.error || "Erro ao cadastrar motorista", "danger");
      }
    } catch (error) {
      showToast("Erro de conexão com servidor", "danger");
    }
  });

  carregarMotoristas(); // chama no início
});