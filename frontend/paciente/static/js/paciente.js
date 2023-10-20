function get_paciente() {
  // Faz a requisição para a API

  //pega o resultado da requisição e coloca na variavel retorno_request
  retorno_request = {
    data: [
      {
        cep: "23047610",
        cid: "",
        cpf: "175719",
        crm: "",
        data_nascimento: "23/05/1990",
        email: "ROMULO@GMAIL.COM",
        empresa: "",
        endereco: "MINHA RUA",
        id_paciente: 1,
        medico_solicitante: "GABRIEL PELUDO",
        nome: "GABRIEL PELUDO",
        numero_carteirinha: "",
        observacao: "",
        ocupacao: "",
        pagamento: "",
        plano: "",
        responsavel: "EU",
        rg: "RG",
        telefone: "21XXXXX",
      },
      {
        cep: "23047610",
        cid: "",
        cpf: "175719",
        crm: "",
        data_nascimento: "23/05/1990",
        email: "ROMULO@GMAIL.COM",
        empresa: "",
        endereco: "MINHA RUA",
        id_paciente: 2,
        medico_solicitante: "GABRIEL PELUDO",
        nome: "Romulo",
        numero_carteirinha: "",
        observacao: "",
        ocupacao: "",
        pagamento: "",
        plano: "",
        responsavel: "EU",
        rg: "RG",
        telefone: "21XXXXX",
      },
    ],
    status: "ok",
  };

  //crie uma condição para caso seja 'ok' ou 'error'
  if (retorno_request.status == "ok") {
    //se for ok, chama a função para montar a tabela
    monta_tabela(retorno_request.data);
  } else {
    //se for error, mostra uma mensagem de erro
    alert("Ocorreu um erro ao buscar os dados");
  }
}

function monta_tabela(dados) {
  $("#paciente tbody").empty();
  dados.forEach((paciente) => {
    $("#paciente tbody").append(`
        <tr>
            <td>${paciente.nome}</td>
            <td>${paciente.telefone}</td>
            <td>${paciente.email}</td>
            <td>${paciente.data_nascimento}</td>
            <td>${paciente.medico_solicitante}</td>
            <td>${paciente.ocupacao}</td>
            <td>${paciente.cid}</td>
            <td>${paciente.observacao}</td>
            <td>
                <button class="btn btn-primary" onclick="editar_paciente(${paciente.id_paciente})">Editar</button>
                <button class="btn btn-danger" onclick="excluir_paciente(${paciente.id_paciente})">Excluir</button>
            </td>
        </tr>
    `);
  });
}

$(document).ready(function () {
  $("#paciente").DataTable({
    language: {
      url: "//cdn.datatables.net/plug-ins/1.13.2/i18n/pt-BR.json",
    },
  });
});

get_paciente();
