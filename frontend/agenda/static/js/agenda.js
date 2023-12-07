function get_agenda() {
  url = window.url_api + "agenda-consulta";
  body = {};
  token = sessionStorage.getItem("token");

  window
    .request_backend(url, body, token)
    .then((data) => {
      if (data.status == "ok") {
        monta_data_table(data.data);
      } else {
        console.log("Erro: " + data.status);
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
  data.forEach(function (agenda) {
    // cria um novo objeto com os dados que serão exibidos na tabela

    const agendaData = {
      data: agenda.data_agenda,
      horario: agenda.horario,
      paciente: agenda.paciente,
      especialidade: agenda.especialidade,
      profissional: agenda.profissional,
      forma_pagamento: agenda.forma_pagamento,
      id_agenda: agenda.id_agenda,
    };

    // adiciona o novo objeto ao array dataSet
    dataSet.push(agendaData);
  });

  // inicializa a tabela com os dados do dataSet
  $("#agenda").DataTable({
    data: dataSet,
    columns: [
      { title: "Data", data: "data" },
      { title: "Horário", data: "horario" },
      { title: "Paciente", data: "paciente" },
      { title: "Especialidade", data: "especialidade" },
      { title: "Profissional", data: "profissional" },
      { title: "Forma de Pagamento", data: "forma_pagamento" },
      //colocar um botão para editar e excluir
      {
        title: "Ações",
        data: null,
        render: function (data, type, row) {
          return (
            "<button class='btn-green' onclick='editar_agenda(" +
            data.id_agenda +
            ")'>Editar</button>" +
            "<button class='btn-red' onclick='excluir_agenda(" +
            data.id_agenda +
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
  get_agenda();
});

function excluir_agenda(id_agenda) {
  //acionar a api para excluir o agenda
  url = window.url_api + "agenda-excluir";
  body = {
    id_agenda: id_agenda,
  };
  token = sessionStorage.getItem("token");
  window.request_backend(url, body, token).then((data) => {
    if (data.status == "ok") {
      window.location.reload();
    } else {
      console.log("Erro: " + data.status);
    }
  });
}

function editar_agenda(id_agenda) {
  window.location.href = "agenda-editar?id_agenda=" + id_agenda;
}
