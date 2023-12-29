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

    // campo pagamento
    if (data[0].pagamento == "plano") {
      document.getElementById("empresa").disabled = false;
      document.getElementById("empresa").required = true;
      document.getElementById("empresa").style.display = "block";

      document.getElementById("numero_carteirinha").disabled = false;
      document.getElementById("numero_carteirinha").required = true;
      document.getElementById("numero_carteirinha").style.display = "block";

      document.getElementById("plano").disabled = false;
      document.getElementById("plano").required = true;
      document.getElementById("plano").style.display = "block";
    } else if (data[0].pagamento == "particular") {
      document.getElementById("empresa").value = "";
      document.getElementById("empresa").disabled = true;
      document.getElementById("empresa").style.display = "none";

      document.getElementById("numero_carteirinha").value = "";
      document.getElementById("numero_carteirinha").disabled = true;
      document.getElementById("numero_carteirinha").style.display = "none";

      document.getElementById("plano").value = "";
      document.getElementById("plano").disabled = true;
      document.getElementById("plano").style.display = "none";
    } else {
      console.log("erro - forma de pagamento não identificada");
    }
  });
}

function verifica_required() {
  nome = document.getElementById("nome").value;
  data_nascimento = document.getElementById("data_nascimento").value;
  telefone = document.getElementById("telefone").value;
  cep = document.getElementById("cep").value;
  endereco = document.getElementById("endereco").value;
  medico_solicitante = document.getElementById("medico_solicitante").value;

  forma_pagamento = document.getElementById("pagamento").value;
  empresa = document.getElementById("empresa").value;
  numero_carteirinha = document.getElementById("numero_carteirinha").value;
  plano = document.getElementById("plano").value;


  // verificar se os campos obrigatórios estão preenchidos
  if (
    nome == "" ||
    endereco == "" ||
    cep == "" ||
    telefone == "" ||
    data_nascimento == "" ||
    medico_solicitante == ""
  ) {
    alert("Preencha todos os campos obrigatórios (*)");
    return false;
  }

  // // se o campo de forma de pagamento for plano, verificar se os campos empresa, numero_carteirinha e plano estão preenchidos
  else if (forma_pagamento == "plano") {
    if (empresa == "0") {
      alert("Selecione a empresa");
      return false;
    }
    else if (numero_carteirinha == "") {
      alert("Preencha o número da carteirinha");
      return false;
    }
    else if (plano == "") {
      alert("Preencha o plano");
      return false;
    }
  }
  
  // se tudo estiver ok, retorna true
  else {
    return true;
  }
}

// funções de formato de campo cep
function formatarCEP(cep) {
  var cepFormatado = cep.replace(/\D/g, ""); // Remove todos os caracteres não numéricos
  cepFormatado = cepFormatado.replace(/^(\d{5})(\d)/, "$1-$2"); // Insere um hífen após o quinto dígito
  if (cepFormatado.length > 9) {
    cepFormatado = cepFormatado.substring(0, 9); // Limita o comprimento a 9 caracteres
  }
  return cepFormatado;
}

// função de formato de campo rg
function formatarRG(rg) {
  var rgFormatado = rg.replace(/\D/g, ""); // Remove todos os caracteres não numéricos
  rgFormatado = rgFormatado.replace(/^(\d{2})(\d)/, "$1.$2"); // Insere um ponto após o segundo dígito
  rgFormatado = rgFormatado.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3"); // Insere um ponto após o quinto dígito
  rgFormatado = rgFormatado.replace(
    /^(\d{2})\.(\d{3})\.(\d{3})(\d)/,
    "$1.$2.$3-$4"
  ); // Insere um hífen após o oitavo dígito
  if (rgFormatado.length > 12) {
    rgFormatado = rgFormatado.substring(0, 12); // Limita o comprimento a 12 caracteres
  }
  return rgFormatado;
}

// função de formato de campo cpf
function formatarCPF(cpf) {
  var cpfFormatado = cpf.replace(/\D/g, ""); // Remove todos os caracteres não numéricos
  cpfFormatado = cpfFormatado.replace(/^(\d{3})(\d)/, "$1.$2"); // Insere um ponto após o terceiro dígito
  cpfFormatado = cpfFormatado.replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3"); // Insere um ponto após o sexto dígito
  cpfFormatado = cpfFormatado.replace(
    /^(\d{3})\.(\d{3})\.(\d{3})(\d)/,
    "$1.$2.$3-$4"
  ); // Insere um hífen após o nono dígito
  if (cpfFormatado.length > 14) {
    cpfFormatado = cpfFormatado.substring(0, 14); // Limita o comprimento a 14 caracteres
  }
  return cpfFormatado;
}

// função de formato de campo telefone
function formatarTelefone(telefone) {
  var telefoneFormatado = telefone.replace(/\D/g, ""); // Remove todos os caracteres não numéricos
  telefoneFormatado = telefoneFormatado.replace(/^(\d{2})(\d)/, "($1) $2"); // Insere parênteses em torno dos dois primeiros dígitos
  if (telefoneFormatado.length < 14) {
    telefoneFormatado = telefoneFormatado.replace(
      /(\(\d{2}\) \d{4})(\d)/,
      "$1-$2"
    ); // Insere um hífen após o sexto dígito para telefones com 8 dígitos
  } else {
    telefoneFormatado = telefoneFormatado.replace(
      /(\(\d{2}\) \d{5})(\d)/,
      "$1-$2"
    ); // Insere um hífen após o sétimo dígito para telefones com 9 dígitos
  }
  // Limita o telefoneFormatado a 15 caracteres
  if (telefoneFormatado.length > 15) {
    telefoneFormatado = telefoneFormatado.substring(0, 15);
  }
  return telefoneFormatado;
}

// função para controlar a necessidade de preenchimento de campos de plano de saúde
function pagamento(forma_pagamento) {
  if (forma_pagamento == "particular") {
    document.getElementById("empresa").value = "";
    document.getElementById("empresa").disabled = true;
    document.getElementById("empresa").style.display = "none";

    document.getElementById("numero_carteirinha").value = "";
    document.getElementById("numero_carteirinha").disabled = true;
    document.getElementById("numero_carteirinha").style.display = "none";

    document.getElementById("plano").value = "";
    document.getElementById("plano").disabled = true;
    document.getElementById("plano").style.display = "none";

  } else if (forma_pagamento == "plano") {

    document.getElementById("empresa").value = 0;
    document.getElementById("empresa").disabled = false;
    document.getElementById("empresa").required = true;
    document.getElementById("empresa").style.display = "block";

    document.getElementById("numero_carteirinha").disabled = false;
    document.getElementById("numero_carteirinha").required = true;
    document.getElementById("numero_carteirinha").style.display = "block";

    document.getElementById("plano").disabled = false;
    document.getElementById("plano").required = true;
    document.getElementById("plano").style.display = "block";



  } else {
    console.log("erro - forma de pagamento não identificada");
  }
}

// DATA NASCIMENTO
function formatarDataNascimento(data) {
  var dataFormatada = data.replace(/\D/g, ""); // Remove todos os caracteres não numéricos
  dataFormatada = dataFormatada.replace(/^(\d{2})(\d)/, "$1/$2"); // Insere uma barra após o segundo dígito
  dataFormatada = dataFormatada.replace(/^(\d{2})\/(\d{2})(\d)/, "$1/$2/$3"); // Insere uma barra após o quarto dígito
  if (dataFormatada.length > 10) {
    dataFormatada = dataFormatada.substring(0, 10); // Limita o comprimento a 10 caracteres
  }

  return dataFormatada;
}

// DATA ATUAL
function data_agora_ddmmaaaa() {
  var data = new Date();
  var dia = data.getDate();
  var mes = data.getMonth() + 1;
  var ano = data.getFullYear();
  var data_formatada = dia + "/" + mes + "/" + ano;
  return data_formatada;
}

// VERIFICA DATA
function verificaData(data_nasc, datahoje) {
  // Converte as datas de string para objeto Date
  var partes1 = data_nasc.split("/");
  var data_nasc = new Date(partes1[2], partes1[1] - 1, partes1[0]);

  var partes2 = datahoje.split("/");
  var datahoje = new Date(partes2[2], partes2[1] - 1, partes2[0]);

  console.log("-- VERIFICANDO DATA --");
  console.log("# data_nasc: " + data_nasc);
  console.log("# datahoje: " + datahoje);

  // Calcula a diferença em milissegundos
  if (data_nasc > datahoje) {
    console.log("# Data de nascimento maior do que a data atual");
    return false;
  } else {
    console.log("# Data de nascimento menor do que a data atual");
    return true;
  }
}

// CALCULA DIFERENÇA ENTRE DATAS
function calcularDiferenca(data_nasc, data_agora) {
  // Converte as datas de string para objeto Date
  var partes1 = data_nasc.split("/");
  var data_nasc = new Date(partes1[2], partes1[1] - 1, partes1[0]);

  var partes2 = data_agora.split("/");
  var data_agora = new Date(partes2[2], partes2[1] - 1, partes2[0]);

  // Calcula a diferença em milissegundos
  var diferenca = data_agora - data_nasc;

  // Converte a diferença de milissegundos para dias
  var diferencaEmDias = diferenca / (1000 * 60 * 60 * 24);

  return diferencaEmDias;
}

// MAIORIDADE
function maioridade(idade) {
  // arredonde a idade para para inteiro
  idade = Math.floor(idade);
  idade = idade / 365;

  if (idade < 18) {
    return false;
  } else {
    return true;
  }
}

// listener

//  listener para verificar se a data de nascimento é maior do que a data atual, se é menor de idade e se é maior de idade
document
  .getElementById("data_nascimento")
  .addEventListener("change", function (event) {
    data_nasc = document.getElementById("data_nascimento").value;
    data_agora = data_agora_ddmmaaaa();

    check_data = verificaData(data_nasc, data_agora);

    if (check_data == false) {
      alert("Data de nascimento maior do que a data atual");
      document.getElementById("data_nascimento").value = "";
    }

  });

// Listener para formatar o campo de cep
document
  .getElementById("cep")
  .addEventListener("input", function (event) {
    this.value = formatarCEP(this.value);
  });

// Listener para formatar o campo de data de nascimento
document
  .getElementById("data_nascimento")
  .addEventListener("input", function (event) {
    this.value = formatarDataNascimento(this.value);
  });

// Listener para formatar o campo de pagamento
document
  .getElementById("pagamento")
  .addEventListener("change", function (event) {
    pagamento(this.value);

  });

// Listener para formatar o campo de telefone
document.getElementById("telefone")
  .addEventListener("input", function (event) {
    this.value = formatarTelefone(this.value);
  });

// Listener para formatar o campo de cpf
document.getElementById("cpf").addEventListener("input", function (event) {
  this.value = formatarCPF(this.value);
});

// Listener para formatar o campo de cpf do responsável
document
  .getElementById("cpf_responsavel")
  .addEventListener("input", function (event) {
    this.value = formatarCPF(this.value);
  });

// Listener para formatar o campo de rg
document.getElementById("rg").addEventListener("input", function (event) {
  this.value = formatarRG(this.value);
});

window.onload = function () {
  load_paciente();
};
