// função chamada quando clica-se no botão de Avançar
function get_content() {
  // verifica se todos os campos obrigatórios foram preenchidos
  check_required = verifica_required();
  if (check_required == false) {
    return false;
  }

  const inputs = document.querySelectorAll("input");
  form = window.get_all_input_content_formdata(inputs, "paciente");

  form.append("cid", document.getElementById("cid").value);
  form.append("observacao", document.getElementById("observacao").value);

  //percorra cada select e pegue o valor selecionado usando o id como chave do json
  const selects = document.querySelectorAll("select");
  for (let i = 0; i < selects.length; i++) {
    form.append(selects[i].id, selects[i].value);
  }

  res = window.new_send_file(form, "paciente-cadastro", "/paciente");
  console.log(res);

  console.log(form);
  return form;
}

function verifica_required() {
  nome = document.getElementById("nome").value;
  data_nascimento = document.getElementById("data_nascimento").value;
  telefone = document.getElementById("telefone").value;
  cep = document.getElementById("cep").value;
  endereco = document.getElementById("endereco").value;
  medico_solicitante = document.getElementById("medico_solicitante").value;
  responsavel = document.getElementById("responsavel").value;
  cpf_responsavel = document.getElementById("cpf_responsavel").value;
  forma_pagamento = document.getElementById("pagamento").value;
  empresa = document.getElementById("empresa").value;
  numero_carteirinha = document.getElementById("numero_carteirinha").value;
  plano = document.getElementById("plano").value;
  

  // maioridade
  idade_dias = calcularDiferenca(data_nascimento, data_agora_ddmmaaaa());
  status_maioridade = maioridade(idade_dias);

  if (
    nome == "" ||
    endereco == "" ||
    cep == "" ||
    telefone == "" ||
    data_nascimento == "" ||
    medico_solicitante == ""
    )
  // se os campos acima estiverem vazios, o formulário não será enviado
  {
    alert("Preencha todos os campos obrigatórios (*)");
    return false;
  }

  // se o paciente for menor de idade, os campos abaixo também são obrigatórios
  else if (status_maioridade == false && responsavel == "") {
    alert("Preencha o nome do responsável");
    return false;
  }
  else if (status_maioridade == false && cpf_responsavel == "") {
    alert("Preencha o CPF do responsável");
    if (cpf_responsavel.length < 14) {
      alert("CPF do responsável inválido");
      return false;
    }
    return false;
  }

  // se a forma de pagamento for plano de saúde, os campos abaixo também são obrigatórios
  else if(forma_pagamento == "plano" && empresa == 0) {
    alert("Selecione uma empresa");
    return false;
  }
  else if(forma_pagamento == "plano" && numero_carteirinha == "") {
    alert("Preencha o número da carteirinha");
    return false;
  }
  else if(forma_pagamento == "plano" && plano == "") {
    alert("Preencha um plano");
    return false;
  }

  // se o cep for inválido, o formulário não será enviado
  else if (cep.length < 9) {
    alert("CEP inválido");
    return false;
  }

  // se tudo estiver ok, o formulário será enviado
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
    // else {
      // idade = calcularDiferenca(data_nasc, data_agora);
      // status_maioridade = maioridade(idade);
      // if (status_maioridade == false) {
      //   document.getElementById("responsavel").style.display = "block";
      // } else {
      //   document.getElementById("responsavel").style.display = "none";
      // }
    // }
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