function get_content() {
  const inputs = document.querySelectorAll("input");

  json = window.get_all_input_content_js(inputs, "profissional");

  json["obs_especializacao"] = document.querySelector("textarea").value;

  //percorra cada select e pegue o valor selecionado usando o id como chave do json
  const selects = document.querySelectorAll("select");
  for (let i = 0; i < selects.length; i++) {
    json[selects[i].id] = selects[i].value;
  }

  console.log(json);
  window.insert_database(json, "profissional-cadastro", "/profissional");
}
