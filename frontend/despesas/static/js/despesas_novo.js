function get_content() {
  const inputs = document.querySelectorAll("input");

  form = window.get_all_input_content_formdata(inputs);

  res = window.new_send_file(form, "despesas-cadastro", "/despesas");
  console.log(res);
  return form;
}
