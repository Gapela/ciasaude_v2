function get_content() {
  const inputs = document.querySelectorAll("input");

  form = window.get_all_input_content_formdata(inputs);

  res = window.new_send_file(form, "agenda-cadastro", "/agenda");
  console.log(res);
  return form;
}
