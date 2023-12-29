// VALIDADORES DE FORMULARIO
function get_content() {

  //verifica se os campos obrigatorios estão preenchidos
  check_required = verifica_required();
  if (check_required == false) {
    return false;
  }

  const inputs = document.querySelectorAll("input");

  form = window.get_all_input_content_formdata(inputs, "profissional");

  form.append("obs_especializacao", document.querySelector("textarea").value);

  //percorra cada select e pegue o valor selecionado usando o id como chave do json
  const selects = document.querySelectorAll("select");
  for (let i = 0; i < selects.length; i++) {
    form.append(selects[i].id, selects[i].value);
  }

  console.log(form);
  res = window.new_send_file(form, "profissional-cadastro", "/profissional");
  console.log(res);
}

function verifica_required() {
  nome = document.getElementById("nome").value;
  endereco = document.getElementById("endereco").value;
  telefone = document.getElementById("telefone").value;
  especialidade = document.getElementById("especialidade").value;


  // verifica se os campos não estão vazios
  if (
    nome == "" ||
    endereco == "" ||
    telefone == "" ||
    especialidade == "sem_especialidade") {
    alert("Por favor, preencha todos os campos obrigatórios (*)");
    return false;
  }

  // verifica se o campo telefone está preenchido corretamente
  else if (telefone.length < 10) {
    alert("Por favor, preencha o campo telefone corretamente");
    return false;
  }

  



  else {
    return true;
  }
}


// FORMATAÇÃO DE FORMULARIO
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

// LISTENERS
document.getElementById("cpf").addEventListener("input", function (event) {
  this.value = formatarCPF(this.value);
});

document.getElementById("rg").addEventListener("input", function (event) {
  this.value = formatarRG(this.value);
});

document.getElementById("telefone").addEventListener("input", function (event) {
  this.value = formatarTelefone(this.value);
});
