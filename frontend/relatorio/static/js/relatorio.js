function generate_report() {
  var module = document.getElementById("modulo").value;
  if (filtros_final.length == 0) {
    console.log("Gerando relatório sem filtros");
    download_report(module, []);
  } else {
    console.log("Relatório gerado com sucesso! Filtros: " + filtros_final);
    download_report(module, filtros_final);
  }
}

filtros_final = [];

function adicionar_filtro() {
  var parametro_filtro = document.getElementById("parametro_filtro").value;
  if (parametro_filtro == "") {
    console.log("Preencha o campo de parâmetro do filtro");
    return;
  }

  var filtro = getSelectedText("campo_filtro");
  var tipo_filtro = getSelectedText("tipo_filtro");
  var div_filtros_aplicados = document.getElementById("filtros-aplicados");

  var div_filtro = document.createElement("div"); // Nova div para o conjunto de filtros

  var div_campo_filtro = document.createElement("div");
  div_filtro.appendChild(div_campo_filtro); // Adiciona à div_filtro em vez de div_filtros_aplicados
  var texto_filtro = document.createTextNode(filtro);
  div_campo_filtro.appendChild(texto_filtro);

  var div_tipo_filtro = document.createElement("div");
  div_filtro.appendChild(div_tipo_filtro);
  var texto_filtro = document.createTextNode(tipo_filtro);
  div_tipo_filtro.appendChild(texto_filtro);

  var div_parametro_filtro = document.createElement("div");
  div_filtro.appendChild(div_parametro_filtro);
  var texto_filtro = document.createTextNode(parametro_filtro);
  div_parametro_filtro.appendChild(texto_filtro);

  var div_botao = document.createElement("button");
  div_filtro.appendChild(div_botao);
  div_botao.setAttribute("class", "button-add");

  var texto_botao = document.createTextNode("Remover");
  div_botao.appendChild(texto_botao);
  div_botao.setAttribute("onclick", "remover_filtro(this)");

  div_filtros_aplicados.appendChild(div_filtro); // Adiciona a div_filtro completa à div_filtros_aplicados
  filtros_final.push([filtro, tipo_filtro, parametro_filtro]);
}

function remover_filtro(botao) {
  // Obtenha os valores do filtro a partir do elemento pai do botão
  var filtro = botao.parentNode.children[0].textContent;
  var tipo = botao.parentNode.children[1].textContent;
  var parametro = botao.parentNode.children[2].textContent;

  // Encontre o filtro no array
  for (var i = 0; i < filtros_final.length; i++) {
    if (
      filtros_final[i].campo === filtro &&
      filtros_final[i].tipo === tipo &&
      filtros_final[i].parametro === parametro
    ) {
      // Remova o filtro do array
      filtros_final.splice(i, 1);
      break;
    }
  }
  botao.parentNode.remove();
}

function getSelectedText(id) {
  var selectElement = document.getElementById(id);
  return selectElement.options[selectElement.selectedIndex].text;
}

function download_report(module, lista_filtros) {
  if (lista_filtros.length == 0) {
    body = {
      module: module,
      data: [],
    };
  } else {
    body = {
      module: module,
      data: lista_filtros,
    };
  }

  url = window.url_api + "relatorio";
  token = sessionStorage.getItem("token");
  window.request_backend(url, body, token).then((data) => {
    //decode data de base64 para blob
    console.log(data.data);
    let encoded_string = data.data; // Sua string codificada em base64
    let binary_string = window.atob(encoded_string);
    let len = binary_string.length;
    let bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    // Cria um novo Blob com os dados retornados
    var blob = new Blob([bytes], { type: "application/octet-stream" });

    // Cria uma URL para o Blob
    var url = URL.createObjectURL(blob);

    // Cria um link temporário
    var a = document.createElement("a");
    a.href = url;
    a.download = "filename." + data.extensao; // Substitua 'filename.ext' pelo nome do arquivo que você deseja

    // Adiciona o link ao corpo do documento e simula um clique nele
    document.body.appendChild(a);
    a.click();

    // Remove o link do corpo do documento
    document.body.removeChild(a);
  });
}

function altera_campos_filter() {
  changed_module = document.getElementById("modulo").value;
  campo_filter = document.getElementById("campo_filtro");
  if (changed_module == "atendimento") {
    campo_filter.innerHTML =
      '<option value="data_inicio">Data inicio</option>\
      <option value="data_fim">Data fim</option>\
      <option value="valor">Formato de Atendimento</option>\
      <option value="status">Especialidade</option>';
  } else if (changed_module == "paciente") {
    campo_filter.innerHTML =
      '<option value="nome">Nome</option>\
      <option value="cpf">CPF</option>\
      <option value="telefone">Telefone</option>\
      <option value="email">Email</option>\
      <option value="endereco">Endereço</option>\
      <option value="diagnostico">Diagnostico</option>\
      <option value="plano">Plano</option>\
      <option value="plano">Ano de Nascimento</option>\
      <option value="plano">Mês de Nascimento</option>\
      <option value="plano">Dia de Nascimento</option>';
  } else if (changed_module == "profissional") {
    campo_filter.innerHTML =
      '<option value="nome">Nome</option>\
      <option value="cpf">CPF</option>\
      <option value="telefone">Telefone</option>\
      <option value="status">Especialidade</option>\
      <option value="data_nascimento">Data de nascimento</option>\
      <option value="endereco">Endereço</option>\
      <option value="especialidade">Especialidade</option>';
  } else if (changed_module == "despesas") {
    campo_filter.innerHTML =
      '<option value="data">Data</option>\
      <option value="descricao">Tipo de transação</option>\
      <option value="valor">Valor</option>\
      <option value="tipo">Nome do responsável</option>';
  }
}
