function get_paciente_edit() {
  check_required = verifica_required();
  if (check_required == false) {
    return false;
  }
  variavel = window.location.search;
  id_paciente = variavel.split("=")[1];
  const inputs = document.querySelectorAll("input");

  form = window.get_all_input_content_formdata(inputs);
  form.append("id_paciente", id_paciente);
  form.append("observacao", document.getElementById("observacao").value);
  form.append("cid", document.getElementById("cid").value);
  //percorra cada select e pegue o valor selecionado usando o id como chave do json
  const selects = document.querySelectorAll("select");
  for (let i = 0; i < selects.length; i++) {
    form.append(selects[i].id, selects[i].value);
  }

  res = window.new_send_file(form, "paciente-editar", "/paciente");
  console.log(res);
  return form;
}

function load_paciente() {
  variavel = window.location.search;
  id_paciente = variavel.split("=")[1];
  url = window.url_api + "paciente-consulta-detalhes";
  body = {
    id_paciente: id_paciente,
  };
  token = sessionStorage.getItem("token");
  window.request_backend(url, body, token).then((data) => {
    data = data.data;
    //preencher os campos do paciente
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
    document.getElementById("endereco").value = data[0].endereco;
    document.getElementById("empresa").value = data[0].empresa;
    // fazer o mesmo para rg, crm, ocupacao, medico_solicitante, numero_carteirinha, plano
    document.getElementById("rg").value = data[0].rg;
    document.getElementById("crm").value = data[0].crm;
    document.getElementById("ocupacao").value = data[0].ocupacao;
    document.getElementById("medico_solicitante").value =
      data[0].medico_solicitante;
    document.getElementById("numero_carteirinha").value =
      data[0].numero_carteirinha;
    document.getElementById("plano").value = data[0].plano;
    document.getElementById("diagnostico").value = data[0].diagnostico;
    // cpf, cpf_responsavel, responsavel
    document.getElementById("cpf").value = data[0].cpf;
    document.getElementById("cpf_responsavel").value = data[0].cpf_responsavel;
    document.getElementById("responsavel").value = data[0].responsavel;
    file_path = data[0].arquivo;
    // set file_path como variavel global
    window.file_path = file_path;
    console.log(data[0]);
  });
}

function verifica_required() {
  nome = document.getElementById("nome").value;
  data_nascimento = document.getElementById("data_nascimento").value;
  telefone = document.getElementById("telefone").value;
  cep = document.getElementById("cep").value;
  endereco = document.getElementById("endereco").value;
  medico_solicitante = document.getElementById("medico_solicitante").value;
  

  // verificar se os campos obrigatórios estão preenchidos
  if (
    nome == "" ||
    data_nascimento == "" ||
    telefone == "" ||
    cep == "" ||
    endereco == "" ||
    medico_solicitante == ""
  ) {
    alert("Preencha todos os campos obrigatórios (*)");
    return false;
  }

  // se tudo estiver ok, retorna true
  else{
    return true;
  }
}

window.onload = function () {
  load_paciente();
};
