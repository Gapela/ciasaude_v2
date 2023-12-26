function pizzaChart(
  labels = [],
  data = [],
  backgroundColor = [],
  borderColor = [],
  borderWidth = 1,
  element = "pizza"
) {
  var ctx = document.getElementById(element).getContext("2d");
  var myChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor: backgroundColor,
          borderColor: borderColor,
          borderWidth: borderWidth,
        },
      ],
    },
  });
}

function bar_chart(
  labels = [],
  data = [],
  backgroundColor = [],
  borderColor = [],
  borderWidth = 1,
  element = "bar",
  label_name = ""
) {
  var ctx = document.getElementById(element).getContext("2d");
  var myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          data: data,
          label: label_name,
          backgroundColor: backgroundColor,
          borderColor: borderColor,
          borderWidth: borderWidth,
        },
      ],
    },
  });
}

function line_chart(
  labels = [],
  data = [],
  backgroundColor = [],
  borderColor = [],
  borderWidth = 1,
  element = "paciente_idade",
  label_name = ""
) {
  var ctx = document.getElementById(element).getContext("2d");
  var myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: label_name,
          data: data,
          backgroundColor: backgroundColor,
          borderColor: borderColor,
          borderWidth: borderWidth,
        },
      ],
    },
  });
}

function load_data() {
  url = window.url_api + "dashboard";
  body = { dashboard: "paciente" };
  token = sessionStorage.getItem("token");

  window
    .request_backend(url, body, token)
    .then((data) => {
      if (data.status == "ok") {
        monta_data_table(data.data);
        monta_kpi(data.data);
      } else {
        console.log("Erro: " + data.status);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function monta_data_table(data_chart) {
  backgroundColor = ["#a9cf3c", "#f6821f"];
  borderColor = [];
  borderWidth = 1;

  data_forma_pagamento = data_chart.kpi.data.slice(-2);
  labels_forma_pagamento = data_chart.kpi.labels.slice(-2);

  pizzaChart(
    (labels = labels_forma_pagamento),
    (data = data_forma_pagamento),
    (backgroundColor = backgroundColor),
    (borderColor = borderColor),
    (borderWidth = 1),
    (element = "pizza")
  );

  labels_paciente_diagnostico = data_chart.paciente_diagnostico.labels;
  data_paciente_diagnostico = data_chart.paciente_diagnostico.data;

  bar_chart(
    (labels = labels_paciente_diagnostico),
    (data = data_paciente_diagnostico),
    (backgroundColor = "#f6821f"),
    borderColor,
    borderWidth,
    (element = "bar"),
    (label_name = "Quantidade de Pacientes")
  );

  labels_faixa_etaria = data_chart.faixa_etaria.labels;
  dados_faixa_etaria = data_chart.faixa_etaria.data;

  line_chart(
    (labels = labels_faixa_etaria),
    (data = dados_faixa_etaria),
    (backgroundColor = "#f6821f"),
    borderColor,
    borderWidth,
    (element = "paciente_idade"),
    (label_name = "Quantidade de Pacientes")
  );

  labels_paciente_profissional = data_chart.paciente_profissional.labels;
  data_paciente_profissional = data_chart.paciente_profissional.data;
  bar_chart(
    labels_paciente_profissional,
    data_paciente_profissional,
    "#f6821f",
    borderColor,
    borderWidth,
    "paciente_profissional",
    "Quantidade de Pacientes"
  );
}

function monta_kpi(data_chart) {
  total = document.getElementById("kpi-1");
  total_ativos = document.getElementById("kpi-2");
  total_inativos = document.getElementById("kpi-3");

  // colocar o texto da div = ao valor do kpi
  //descobrir o indice que contem o texto 'total_paciente' dentro de data.labels
  tamanho = data_chart.kpi.labels.length;

  total.innerHTML = data_chart.kpi.data[tamanho - 1];
  total_ativos.innerHTML = data_chart.paciente_ativos.data[0];
  total_inativos.innerHTML = data_chart.paciente_ativos.data[1];
}

window.onload = function () {
  load_data();
};
