function get_paciente() {
  url = window.url_api + "paciente-consulta";
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
  data.forEach(function (paciente) {
    // cria um novo objeto com os dados que serão exibidos na tabela

    const pacienteData = {
      nome: paciente.nome,
      telefone: paciente.telefone,
      email: paciente.email,
      data_nascimento: paciente.data_nascimento,
      forma_pagamento: paciente.pagamento,
      id_paciente: paciente.id_paciente,
    };

    // adiciona o novo objeto ao array dataSet
    dataSet.push(pacienteData);
  });

  // inicializa a tabela com os dados do dataSet
  $("#paciente").DataTable({
    data: dataSet,
    columns: [
      { title: "Nome", data: "nome" },
      { title: "Telefone", data: "telefone" },
      { title: "E-mail", data: "email" },
      { title: "Data de Nascimento", data: "data_nascimento" },
      { title: "Forma de Pagamento", data: "forma_pagamento" },
      //colocar um botão para editar e excluir
      {
        title: "Ações",
        data: null,
        render: function (data, type, row) {
          return (
            "<button class='btn-green' onclick='editar_paciente(" +
            data.id_paciente +
            ")'>Editar</button>" +
            "<button class='btn-red' onclick='excluir_paciente(" +
            data.id_paciente +
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
  get_paciente();
});

function excluir_paciente(id_paciente) {
  //acionar a api para excluir o paciente
  url = window.url_api + "paciente-excluir";
  body = {
    id_paciente: id_paciente,
  };
  token = sessionStorage.getItem("token");
  window.request_backend(url, body, token).then((data) => {
    if (data.status == "ok") {
      window.location.reload();
    } else {
      alert("Erro: " + data.status);
    }
  });
}

function editar_paciente(id_paciente) {
  window.location.href = "paciente-editar?id_paciente=" + id_paciente;
}
