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
      data: despesas.data,
      tipo_despesa: despesas.tipo_despesa,
      descricao: despesas.descricao,
      valor: despesas.valor,
      nome_responsavel: despesas.nome_responsavel,
      id_despesas: despesas.id_despesas,
    };

    // adiciona o novo objeto ao array dataSet
    dataSet.push(despesasData);
  });

  // inicializa a tabela com os dados do dataSet
  $("#despesas").DataTable({
    data: dataSet,
    columns: [
      { title: "Data", data: "data" },
      { title: "Tipo de Despesa", data: "tipo_despesa" },
      { title: "Descrição", data: "descricao" },
      { title: "Valor", data: "valor" },
      { title: "Nome do Responsável", data: "nome_responsavel" },
      //colocar um botão para editar e excluir
      {
        title: "Ações",
        data: null,
        render: function (data, type, row) {
          return (
            "<button class='btn-green' onclick='editar_despesas(" +
            data.id_despesas +
            ")'>Editar</button>" +
            "<button class='btn-red' onclick='excluir_despesas(" +
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
