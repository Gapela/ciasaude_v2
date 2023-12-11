// função chamada quando clica-se no botão de Avançar
function get_content() {
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

// funções de formato de campo cep
function formatarCEP(cep) {
  var cepFormatado = cep.replace(/\D/g, ""); // Remove todos os caracteres não numéricos
  cepFormatado = cepFormatado.replace(/^(\d{5})(\d)/, "$1-$2"); // Insere um hífen após o quinto dígito
  if (cepFormatado.length > 9) {
    cepFormatado = cepFormatado.substring(0, 9); // Limita o comprimento a 9 caracteres
  }
  return cepFormatado;
}

document.getElementById("cep").addEventListener("input", function (event) {
  this.value = formatarCEP(this.value);
});

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

document.getElementById("rg").addEventListener("input", function (event) {
  this.value = formatarRG(this.value);
});

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

document.getElementById("cpf").addEventListener("input", function (event) {
  this.value = formatarCPF(this.value);
});

document
  .getElementById("cpf_responsavel")
  .addEventListener("input", function (event) {
    this.value = formatarCPF(this.value);
  });

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

document.getElementById("telefone").addEventListener("input", function (event) {
  this.value = formatarTelefone(this.value);
});

// função para controlar a necessidade de preenchimento de campos de plano de saúde
function pagamento(forma_pagamento) {
  if (forma_pagamento == "particular") {
    document.getElementById("empresa").value = "";
    document.getElementById("empresa").disabled = true;

    document.getElementById("numero_carteirinha").value = "";
    document.getElementById("numero_carteirinha").disabled = true;

    document.getElementById("plano").value = "";
    document.getElementById("plano").disabled = true;
  } else if (forma_pagamento == "plano") {
    document.getElementById("empresa").disabled = false;
    document.getElementById("numero_carteirinha").disabled = false;
    document.getElementById("plano").disabled = false;

    document.getElementById("empresa").required = true;
    document.getElementById("numero_carteirinha").required = true;
    document.getElementById("plano").required = true;

    document.getElementById("empresa").value = 0;
  } else {
    console.log("erro - forma de pagamento não identificada");
  }
}

document
  .getElementById("pagamento")
  .addEventListener("change", function (event) {
    pagamento(this.value);
  });

// Data Nascimento
// fica escutando o campo data de nascimento e formata a data inserida em dd/mm/aaaa durante insert
function formatarDataNascimento(data) {
  var dataFormatada = data.replace(/\D/g, ""); // Remove todos os caracteres não numéricos
  dataFormatada = dataFormatada.replace(/^(\d{2})(\d)/, "$1/$2"); // Insere uma barra após o segundo dígito
  dataFormatada = dataFormatada.replace(/^(\d{2})\/(\d{2})(\d)/, "$1/$2/$3"); // Insere uma barra após o quarto dígito
  if (dataFormatada.length > 10) {
    dataFormatada = dataFormatada.substring(0, 10); // Limita o comprimento a 10 caracteres
  }

  return dataFormatada;
}
document
  .getElementById("data_nascimento")
  .addEventListener("input", function (event) {
    this.value = formatarDataNascimento(this.value);
  });

// DATA NASCIMENTO
function data_agora_ddmmaaaa() {
  var data = new Date();
  var dia = data.getDate();
  var mes = data.getMonth() + 1;
  var ano = data.getFullYear();
  var data_formatada = dia + "/" + mes + "/" + ano;
  return data_formatada;
}

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

function maioridade(idade) {
  // arredonde a idade para para inteiro
  idade = Math.floor(idade);
  idade = idade / 365;

  if (idade < 18) {
    alert(
      "O paciente é menor de idade, é necessário informação do responsável."
    );
    return false;
  } else {
    return true;
  }
}

// listener
document
  .getElementById("data_nascimento")
  .addEventListener("change", function (event) {
    data_nasc = document.getElementById("data_nascimento").value;
    data_agora = data_agora_ddmmaaaa();

    check_data = verificaData(data_nasc, data_agora);

    if (check_data == false) {
      alert("Data de nascimento maior do que a data atual");
      document.getElementById("data_nascimento").value = "";
    } else {
      idade = calcularDiferenca(data_nasc, data_agora);
      status_maioridade = maioridade(idade);
      if (status_maioridade == false) {
        document.getElementById("responsavel").style.display = "block";
      } else {
        document.getElementById("responsavel").style.display = "none";
      }
    }
  });
