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
  body = { dashboard: "atendimento" };
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
  labels_entrada_periodo = data_chart.ativos_especialidade.labels;
  data_entrada_periodo = data_chart.ativos_especialidade.data;
  bar_chart(
    (labels = labels_entrada_periodo),
    (data = data_entrada_periodo),
    (backgroundColor = "#f6821f"),
    borderColor,
    borderWidth,
    (element = "tratamentos_especialidade"),
    (label_name = "Qtd Especialidade")
  );

  labels_saida_periodo = data_chart.ativos_profissional.labels;
  data_saida_periodo = data_chart.ativos_profissional.data;
  bar_chart(
    (labels = labels_saida_periodo),
    (data = data_saida_periodo),
    (backgroundColor = "#f6821f"),
    borderColor,
    borderWidth,
    (element = "tratamentos_profissional"),
    (label_name = "Qtd Profissional")
  );
}

function monta_kpi(data_chart) {
  total_entrada = document.getElementById("kpi-1");
  total_saida = document.getElementById("kpi-2");
  total_calculo = document.getElementById("kpi-3");

  // colocar o texto da div = ao valor do kpi
  total_entrada.innerHTML = data_chart.ativos.data;
  total_saida.innerHTML = data_chart.formato_atendimento.data[0];
  total_calculo.innerHTML = data_chart.formato_atendimento.data[1];
}

window.onload = function () {
  load_data();
};
