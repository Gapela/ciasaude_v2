function get_content() {
  const inputs = document.querySelectorAll("input");

  form = window.get_all_input_content_formdata(inputs, "profissional");

  form.append("observacao", document.getElementById("observacao").value);
  form.append("cid", document.getElementById("cid").value);
  //percorra cada select e pegue o valor selecionado usando o id como chave do json
  const selects = document.querySelectorAll("select");
  for (let i = 0; i < selects.length; i++) {
    form.append(selects[i].id, selects[i].value);
  }

  res = window.new_send_file(form, "despesas-cadastro", "/despesas");
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
    document.getElementById("nome").value = data[0].nome;
    document.getElementById("telefone").value = data[0].telefone;
    document.getElementById("email").value = data[0].email;
    document.getElementById("data_nascimento").value = data[0].data_nascimento;
    document.getElementById("pagamento").value = data[0].pagamento;
    document.getElementById("observacao").value = data[0].observacao;
    document.getElementById("cid").value = data[0].cid;
    document.getElementById("cep").value = data[0].cep;
    //selecionar o index de um select com a informação vindo do data[0].pagamento
    document.getElementById("pagamento").value = data[0].pagamento;

    document.getElementById("empresa").value = data[0].empresa;
    console.log(data[0]);
  });
}

window.onload = function () {
  load_despesas();
};
