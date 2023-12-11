function get_despesas_edit() {
  const inputs = document.querySelectorAll("input");

  form = window.get_all_input_content_formdata(inputs, "profissional");
  variavel = window.location.search;
  id_despesas = variavel.split("=")[1];
  form.append("id_despesas", id_despesas);
  //percorra cada select e pegue o valor selecionado usando o id como chave do json
  const selects = document.querySelectorAll("select");
  for (let i = 0; i < selects.length; i++) {
    form.append(selects[i].id, selects[i].value);
  }
  res = window.new_send_file(form, "despesas-editar", "/despesas");
  console.log(res);
  return form;
}

function load_despesas() {
  variavel = window.location.search;
  id_despesas = variavel.split("=")[1];
  url = window.url_api + "despesas-consulta-detalhes";
  body = {
    id_despesas: id_despesas,
  };
  token = sessionStorage.getItem("token");
  window.request_backend(url, body, token).then((data) => {
    data = data.data;
    //preencher os campos do despesas
    document.getElementById("data").value = data[0].data;
    document.getElementById("tipo_despesa").value = data[0].tipo_despesa;
    document.getElementById("valor").value = data[0].valor;
    document.getElementById("descricao").value = data[0].descricao;
    document.getElementById("tipo").value = data[0].tipo;
    document.getElementById("nome_responsavel").value =
      data[0].nome_responsavel;
    file_path = data[0].arquivo;
    // set file_path como variavel global
    window.file_path = file_path;
    console.log(data[0]);
  });
}

window.onload = function () {
  load_despesas();
};
