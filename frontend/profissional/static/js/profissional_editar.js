function get_profissional_edit() {
  variavel = window.location.search;
  id_profissional = variavel.split("=")[1];
  const inputs = document.querySelectorAll("input");

  form = window.get_all_input_content_formdata(inputs);
  form.append("id_profissional", id_profissional);
  form.append("obs_especializacao", document.getElementById("obs_especializacao").value);

  //percorra cada select e pegue o valor selecionado usando o id como chave do json
  const selects = document.querySelectorAll("select");
  for (let i = 0; i < selects.length; i++) {
    form.append(selects[i].id, selects[i].value);
  }

  res = window.new_send_file(form, "profissional-editar", "/profissional");
  console.log(res);
  return form;
}

function load_profissional() {
  variavel = window.location.search;
  id_profissional = variavel.split("=")[1];
  url = window.url_api + "profissional-consulta-detalhes";
  body = {
    id_profissional: id_profissional,
  };
  token = sessionStorage.getItem("token");
  window.request_backend(url, body, token).then((data) => {
    data = data.data;
    console.log(data)
    //preencher os campos do profissional
    document.getElementById("nome").value = data[0].nome;
    document.getElementById("crm").value = data[0].crm;
    document.getElementById("especialidade").value = data[0].especialidade;
    console.log(data[0]);
  });
}

window.onload = function () {
  load_profissional();
};
