function get_despesas() {
  url = window.url_api + "despesas-consulta";
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
  data.forEach(function (despesas) {
    // cria um novo objeto com os dados que serão exibidos na tabela

    const despesasData = {
      nome: despesas.nome,
      telefone: despesas.telefone,
      email: despesas.email,
      data_nascimento: despesas.data_nascimento,
      forma_pagamento: despesas.pagamento,
      id_despesas: despesas.id_despesas,
    };

    // adiciona o novo objeto ao array dataSet
    dataSet.push(despesasData);
  });

  // inicializa a tabela com os dados do dataSet
  $("#despesas").DataTable({
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
            "<button class='btn btn-primary' onclick='editar_despesas(" +
            data.id_despesas +
            ")'>Editar</button>" +
            "<button class='btn btn-danger' onclick='excluir_despesas(" +
            data.id_despesas +
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
  get_despesas();
});

function excluir_despesas(id_despesas) {
  //acionar a api para excluir o despesas
  url = window.url_api + "despesas-excluir";
  body = {
    id_despesas: id_despesas,
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

function editar_despesas(id_despesas) {
  window.location.href = "despesas-editar?id_despesas=" + id_despesas;
}
