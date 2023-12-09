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
  body = { dashboard: "financeiro" };
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
  labels_entrada_periodo = data_chart.entrada_periodo.labels;
  data_entrada_periodo = data_chart.entrada_periodo.data;
  line_chart(
    (labels = labels_entrada_periodo),
    (data = data_entrada_periodo),
    (backgroundColor = "#f6821f"),
    borderColor,
    borderWidth,
    (element = "entrada_periodo"),
    (label_name = "Valor de Entrada")
  );

  labels_saida_periodo = data_chart.saida_periodo.labels;
  data_saida_periodo = data_chart.saida_periodo.data;
  line_chart(
    (labels = labels_saida_periodo),
    (data = data_saida_periodo),
    (backgroundColor = "#f6821f"),
    borderColor,
    borderWidth,
    (element = "saida_periodo"),
    (label_name = "Saida por período")
  );

  labels_balanco_mes = data_chart.balanco_mes.labels;
  data_balanco_mes = data_chart.balanco_mes.data;
  bar_chart(
    labels_balanco_mes,
    data_balanco_mes,
    "#f6821f",
    borderColor,
    borderWidth,
    "entrada_calculo",
    "Balanço de Entrada e Saida por Mês"
  );
}

function monta_kpi(data_chart) {
  total_entrada = document.getElementById("kpi-entradas");
  total_saida = document.getElementById("kpi-saidas");
  total_calculo = document.getElementById("kpi-calculo");

  // colocar o texto da div = ao valor do kpi
  total_entrada.innerHTML = data_chart.entrada_soma.data;
  total_saida.innerHTML = data_chart.saida_soma.data;
  total_calculo.innerHTML =
    parseFloat(data_chart.entrada_soma.data) -
    parseFloat(data_chart.saida_soma.data);
}

window.pizzaChart = pizzaChart;

window.onload = function () {
  load_data();
};
