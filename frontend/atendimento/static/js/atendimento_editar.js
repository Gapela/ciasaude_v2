function get_atendimento_edit() {
  variavel = window.location.search;
  id_atendimento = variavel.split("=")[1];
  const inputs = document.querySelectorAll("input");

  form = window.get_all_input_content_formdata(inputs);
  form.append("id_atendimento", id_atendimento);

  //percorra cada select e pegue o valor selecionado usando o id como chave do json
  const selects = document.querySelectorAll("select");
  for (let i = 0; i < selects.length; i++) {
    form.append(selects[i].id, selects[i].value);
  }

  res = window.new_send_file(form, "atendimento-editar", "/atendimento");
  console.log(res);
  return form;
}

function load_atendimento() {
  get_paciente_profissional();
  variavel = window.location.search;
  id_atendimento = variavel.split("=")[1];
  url = window.url_api + "atendimento-consulta-detalhes";
  body = {
    id_atendimento: id_atendimento,
  };
  token = sessionStorage.getItem("token");

  window.request_backend(url, body, token).then((data) => {
    data = data.data;
    console.log(data);
    //preencher os campos do atendimento
    document.getElementById("id_paciente").value = data[0].id_paciente;
    document.getElementById("id_profissional").value = data[0].id_profissional;
    document.getElementById("observacao").value = data[0].observacao;
    document.getElementById("data_inicio").value = data[0].data_inicio;
    document.getElementById("data_fim").value = data[0].data_fim;
    document.getElementById("formato_atendimento").value =
      data[0].formato_atendimento;
    window.id_paciente = data[0].id_paciente;
    window.id_profissional = data[0].id_profissional;
    console.log(data[0]);
  });
}

window.onload = function () {
  load_atendimento();
};

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
          if (window.id_paciente == paciente.id_paciente) {
            document.querySelector("#id_paciente").innerHTML += `
            <option selected value="${paciente.id_paciente}">${paciente.paciente}</option>
            `;
          } else {
            document.querySelector("#id_paciente").innerHTML += `
            <option value="${paciente.id_paciente}">${paciente.paciente}</option>
            `;
          }
        });
        data.data.profissional.forEach((profissional) => {
          if (window.id_profissional == profissional.id_profissional) {
            document.querySelector("#id_profissional").innerHTML += `
            <option selected value="${profissional.id_profissional}">${profissional.profissional}</option>
            `;
          } else {
            document.querySelector("#id_profissional").innerHTML += `
            <option value="${profissional.id_profissional}">${profissional.profissional}</option>
            `;
          }
        });
      } else {
        console.log("Erro: " + data.data);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
