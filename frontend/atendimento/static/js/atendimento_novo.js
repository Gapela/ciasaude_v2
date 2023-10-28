function get_content() {
  const inputs = document.querySelectorAll("input");

  form = window.get_all_input_content_formdata(inputs, "atendimento");

  form.append("observacao", document.getElementById("observacao").value);

  //percorra cada select e pegue o valor selecionado usando o id como chave do json
  const selects = document.querySelectorAll("select");
  for (let i = 0; i < selects.length; i++) {
    form.append(selects[i].id, selects[i].value);
  }

  res = window.new_send_file(form, "atendimento-cadastro", "/atendimento");
  console.log(res);
  return form;
}

function get_paciente_profissional() {
  url = window.url_api + "atendimento-paciente-profissional";
  token = sessionStorage.getItem("token");
  body = {};

  window
    .request_backend(url, body, token)
    .then((data) => {
      console.log(data);
      if (data.status == "ok") {
        data.data.paciente.forEach((paciente) => {
          document.querySelector("#id_paciente").innerHTML += `
          <option value="${paciente.id_paciente}">${paciente.paciente}</option>
          `;
        });
        data.data.profissional.forEach((profissional) => {
          document.querySelector("#id_profissional").innerHTML += `
          <option value="${profissional.id_profissional}">${profissional.profissional}</option>
          `;
        });
      } else {
        alert("Erro: " + data.data);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

//quando a pagina carregar, chama a função get_content
window.onload = function () {
  get_paciente_profissional();
};
