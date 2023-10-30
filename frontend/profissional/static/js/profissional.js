function get_profissional() {
  url = window.url_api + "profissional-consulta";
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
  data.forEach(function (profissional) {
    // cria um novo objeto com os dados que serão exibidos na tabela

    const profissionalData = {
      nome: profissional.nome,
      crm: profissional.crm,
      especialidade: profissional.especialidade,
      id_profissional: profissional.id_profissional,
    };

    // adiciona o novo objeto ao array dataSet
    dataSet.push(profissionalData);
  });

  // inicializa a tabela com os dados do dataSet
  $("#profissional").DataTable({
    data: dataSet,
    columns: [
      { title: "Nome", data: "nome" },
      { title: "CRM", data: "crm" },
      { title: "Especialidade", data: "especialidade" },
      //colocar um botão para editar e excluir
      {
        title: "Ações",
        data: null,
        render: function (data, type, row) {
          return (
            "<button class='btn btn-primary' onclick='editar_profissional(" +
            data.id_profissional +
            ")'>Editar</button>" +
            "<button class='btn btn-danger' onclick='excluir_profissional(" +
            data.id_profissional +
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
  get_profissional();
});

function excluir_profissional(id_profissional) {
  //acionar a api para excluir o profissional
  url = window.url_api + "profissional-excluir";
  body = {
    id_profissional: id_profissional,
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

function editar_profissional(id_profissional) {
  window.location.href = "profissional-editar?id_profissional=" + id_profissional;
}