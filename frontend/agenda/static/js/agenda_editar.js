function get_agenda_edit() {
  const inputs = document.querySelectorAll("input");

  form = window.get_all_input_content_formdata(inputs, "profissional");
  variavel = window.location.search;
  id_agenda = variavel.split("=")[1];
  form.append("id_agenda", id_agenda);
  res = window.new_send_file(form, "agenda-editar", "/agenda");
  console.log(res);
  return form;
}

function load_agenda() {
  variavel = window.location.search;
  id_agenda = variavel.split("=")[1];
  url = window.url_api + "agenda-consulta-detalhes";
  body = {
    id_agenda: id_agenda,
  };
  token = sessionStorage.getItem("token");
  window.request_backend(url, body, token).then((data) => {
    data = data.data;
    //preencher os campos do agenda
    document.getElementById("data").value = data[0].data;
    document.getElementById("tipo_despesa").value = data[0].tipo_despesa;
    document.getElementById("valor").value = data[0].valor;
    document.getElementById("descricao").value = data[0].descricao;
    document.getElementById("nome_responsavel").value =
      data[0].nome_responsavel;
    file_path = data[0].arquivo;
    // set file_path como variavel global
    window.file_path = file_path;
    console.log(data[0]);
  });
}

window.onload = function () {
  load_agenda();
};
