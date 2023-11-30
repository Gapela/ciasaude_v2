function get_profissional_edit() {
  variavel = window.location.search;
  id_profissional = variavel.split("=")[1];
  const inputs = document.querySelectorAll("input");

  form = window.get_all_input_content_formdata(inputs);
  form.append("id_profissional", id_profissional);
  form.append(
    "obs_especializacao",
    document.getElementById("obs_especializacao").value
  );

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
    console.log(data);
    //preencher os campos do profissional
    document.getElementById("nome").value = data[0].nome;
    document.getElementById("crm").value = data[0].crm;
    document.getElementById("especialidade").value = data[0].especialidade;
    document.getElementById("telefone").value = data[0].telefone;
    // faca a mesma coisa para rg, cpf, endereco, obs_especializacao
    document.getElementById("rg").value = data[0].rg;
    document.getElementById("cpf").value = data[0].cpf;
    document.getElementById("endereco").value = data[0].endereco;
    document.getElementById("obs_especializacao").value =
      data[0].obs_especializacao;
    // empresa, plano, pix, banco, agencia, conta, pagamento
    document.getElementById("empresa").value = data[0].empresa;
    document.getElementById("plano").value = data[0].plano;
    document.getElementById("pix").value = data[0].pix;
    document.getElementById("banco").value = data[0].banco;
    document.getElementById("agencia").value = data[0].agencia;
    document.getElementById("conta").value = data[0].conta;
    document.getElementById("pagamento").value = data[0].pagamento;
    file_path = data[0].arquivo;
    // set file_path como variavel global
    window.file_path = file_path;
    console.log(data[0]);
  });
}

window.onload = function () {
  load_profissional();
};
