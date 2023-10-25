function get_content() {
  const inputs = document.querySelectorAll("input");

  json = {};
  for (let i = 0; i < inputs.length; i++) {
    //converter os inputs em json usando o id do input como chave e a value como valor
    json[inputs[i].id] = inputs[i].value;

    //verifica se o input é do tipo checkbox
    if (inputs[i].type == "checkbox") {
      //se for, desmarca o checkbox
      inputs[i].checked = false;
    } else {
      //se não for, limpa o campo
      inputs[i].value = "";
    }
  }

  //pegar os valores do textarea e do select
  json["descricao"] = document.querySelector("textarea").value;
  json["tipo"] = document.querySelector("select").value;
  //pegar os dados do input file
  json["imagem"] = document.querySelector("input[type=file]").files[0];

  //redirecionar para a página de cadastro de atendimento
  window.location.href = "/atendimento-novo";
  return json;
}
