function get_content() {
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
