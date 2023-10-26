function get_atendimento() {
  url = window.url_api + "atendimento-consulta";
  body = {};
  token = sessionStorage.getItem("token");

  window
    .request_backend(url, body, token)
    .then((data) => {
      if (data.status == "ok") {
        monta_data_table(data.data);
      } else {
        alert("Erro: " + data.status);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function monta_data_table(data) {
  const dataSet = [];
  console.log(data);
  // percorre o array de objetos
  data.forEach(function (atendimento) {
    // cria um novo objeto com os dados que serão exibidos na tabela

    const atendimentoData = {
      paciente: atendimento.paciente,
      especialidade: atendimento.especialidade,
      profissional: atendimento.profissional,
      data_inicio: atendimento.data_inicio,
      data_fim: atendimento.data_fim,
    };

    // adiciona o novo objeto ao array dataSet
    dataSet.push(atendimentoData);
  });

  // inicializa a tabela com os dados do dataSet
  $("#atendimento").DataTable({
    data: dataSet,
    columns: [
      { title: "Paciente", data: "paciente" },
      { title: "Especialidade", data: "especialidade" },
      { title: "Profissional", data: "profissional" },
      { title: "Data de Início", data: "data_inicio" },
      { title: "Data de Fim", data: "data_fim" },
      //colocar um botão para editar e excluir
      {
        title: "Ações",
        data: null,
        render: function (data, type, row) {
          return (
            "<button class='btn btn-primary' onclick='editar_atendimento(" +
            data.id_atendimento +
            ")'>Editar</button>" +
            "<button class='btn btn-danger' onclick='excluir_atendimento(" +
            data.id_atendimento +
            ")'>Excluir</button>"
          );
        },
      },
    ],
    language: {
      url: "//cdn.datatables.net/plug-ins/1.13.2/i18n/pt-BR.json",
    },
  });
}

$(document).ready(function () {
  get_atendimento();
});
