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

  res = window.new_send_file(form, "paciente-cadastro", "/paciente");
  console.log(res);
  return form;
}

function formatarCEP(cep) {
  var cepFormatado = cep.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
  cepFormatado = cepFormatado.replace(/^(\d{5})(\d)/, '$1-$2'); // Insere um hífen após o quinto dígito
  if (cepFormatado.length > 9) {
      cepFormatado = cepFormatado.substring(0, 9); // Limita o comprimento a 9 caracteres
  }
  return cepFormatado;
}

function formatarRG(rg) {
  var rgFormatado = rg.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
  rgFormatado = rgFormatado.replace(/^(\d{2})(\d)/, '$1.$2'); // Insere um ponto após o segundo dígito
  rgFormatado = rgFormatado.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3'); // Insere um ponto após o quinto dígito
  rgFormatado = rgFormatado.replace(/^(\d{2})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4'); // Insere um hífen após o oitavo dígito
  if (rgFormatado.length > 12) {
      rgFormatado = rgFormatado.substring(0, 12); // Limita o comprimento a 12 caracteres
  }
  return rgFormatado;
}

function formatarCPF(cpf) {
  var cpfFormatado = cpf.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
  cpfFormatado = cpfFormatado.replace(/^(\d{3})(\d)/, '$1.$2'); // Insere um ponto após o terceiro dígito
  cpfFormatado = cpfFormatado.replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3'); // Insere um ponto após o sexto dígito
  cpfFormatado = cpfFormatado.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4'); // Insere um hífen após o nono dígito
  if (cpfFormatado.length > 14) {
      cpfFormatado = cpfFormatado.substring(0, 14); // Limita o comprimento a 14 caracteres
  }
  return cpfFormatado;
}

function formatarTelefone(telefone) {
  var telefoneFormatado = telefone.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
  telefoneFormatado = telefoneFormatado.replace(/^(\d{2})(\d)/, '($1) $2'); // Insere parênteses em torno dos dois primeiros dígitos
  if (telefoneFormatado.length < 14) {
      telefoneFormatado = telefoneFormatado.replace(/(\(\d{2}\) \d{4})(\d)/, '$1-$2'); // Insere um hífen após o sexto dígito para telefones com 8 dígitos
  } else {
      telefoneFormatado = telefoneFormatado.replace(/(\(\d{2}\) \d{5})(\d)/, '$1-$2'); // Insere um hífen após o sétimo dígito para telefones com 9 dígitos
  }
  // Limita o telefoneFormatado a 15 caracteres
  if (telefoneFormatado.length > 15) {
      telefoneFormatado = telefoneFormatado.substring(0, 15);
  }
  return telefoneFormatado;
}

function formatarData(data) {
  var dataFormatada = data.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
  dataFormatada = dataFormatada.replace(/^(\d{2})(\d)/, '$1/$2'); // Insere uma barra após o segundo dígito
  dataFormatada = dataFormatada.replace(/^(\d{2})\/(\d{2})(\d)/, '$1/$2/$3'); // Insere uma barra após o quarto dígito
  if (dataFormatada.length > 10) {
      dataFormatada = dataFormatada.substring(0, 10); // Limita o comprimento a 10 caracteres
  }
  return dataFormatada;
}

function calcularIdade(data_nascimento) {
  var hoje = new Date();
  var nascimento = new Date(data_nascimento);
  var idade = hoje.getFullYear() - nascimento.getFullYear();
  var m = hoje.getMonth() - nascimento.getMonth();

  if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) {
    idade--;
  }

  var responsavel = document.getElementById('responsavel');
  var cpfResponsavel = document.getElementById('cpf_responsavel');

  if (idade < 18) {
    responsavel.required = true;
    cpfResponsavel.required = true;
    alert('Paciente menor de idade. Informe o responsável e cpf.');
  } else {
    responsavel.required = false;
    cpfResponsavel.required = false;
  }
}

function pagamento(forma_pagamento) {

  if (forma_pagamento == 'particular') {

    document.getElementById('empresa').value = '';
    document.getElementById('empresa').disabled = true;

    document.getElementById('numero_carteirinha').value = '';
    document.getElementById('numero_carteirinha').disabled = true;

    document.getElementById('plano').value = '';  
    document.getElementById('plano').disabled = true;

  } else if (forma_pagamento == 'plano') {

    document.getElementById('empresa').disabled = false;
    document.getElementById('numero_carteirinha').disabled = false;
    document.getElementById('plano').disabled = false;

    document.getElementById('empresa').required = true;
    document.getElementById('numero_carteirinha').required = true;
    document.getElementById('plano').required = true;

    document.getElementById('empresa').value = 0;
  }
  else {
    console.log('erro - forma de pagamento não identificada');
  }
}


document.getElementById('cep').addEventListener('input', function (event) {
  this.value = formatarCEP(this.value);
});

document.getElementById('rg').addEventListener('input', function (event) {
  this.value = formatarRG(this.value);
});

document.getElementById('cpf').addEventListener('input', function (event) {
  this.value = formatarCPF(this.value);
});

document.getElementById('cpf_responsavel').addEventListener('input', function (event) {
  this.value = formatarCPF(this.value);
});

document.getElementById('telefone').addEventListener('input', function (event) {
  this.value = formatarTelefone(this.value);
});

document.getElementById('data_nascimento').addEventListener('input', function (event) {
  this.value = formatarData(this.value);
});

document.getElementById('pagamento').addEventListener('change', function (event) {
  pagamento(this.value);
});