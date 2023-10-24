function get_paciente() {
  // Faz a requisição para a API
  url = url_api + "paciente-consulta";
  body = {};
  token = sessionStorage.getItem("token");
  response = request_backend(url, body, token);

  //crie uma condição para caso seja 'ok' ou 'error'
  if (response.status == "ok") {
    //se for ok, chama a função para montar a tabela
    monta_tabela(response.data);
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
