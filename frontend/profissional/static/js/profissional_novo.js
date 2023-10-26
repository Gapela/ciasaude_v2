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
  json["obs_especializacao"] = document.querySelector("textarea").value;

  //percorra cada select e pegue o valor selecionado usando o id como chave do json
  const selects = document.querySelectorAll("select");
  for (let i = 0; i < selects.length; i++) {
    json[selects[i].id] = selects[i].value;
  }
  window.insert_database(json, "profissional-cadastro", "/profissional");
}
