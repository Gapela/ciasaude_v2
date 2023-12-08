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
  backgroundColor = ["#a9cf3c", "#f6821f"];
  borderColor = [];
  borderWidth = 1;

  diagnosticos = [
    "Diabetes",
    "Hipertensão",
    "Obesidade",
    "Ansiedade",
    "TDAH",
    "Outros",
  ];
  data = [10, 20, 30, 40, 50, 60];
  bar_chart(
    (labels = diagnosticos),
    (data = data),
    (backgroundColor = "#f6821f"),
    borderColor,
    borderWidth,
    (element = "profissional_plano"),
    (label_name = "Quantidade de Pacientes")
  );

  labels = ["10", "20", "30", "40", "50", "60"];
  data = [10, 20, 30, 40, 50, 60];
  line_chart(
    (labels = labels),
    (data = data),
    (backgroundColor = "#f6821f"),
    borderColor,
    borderWidth,
    (element = "profissional_especialidade"),
    (label_name = "Quantidade de Pacientes")
  );
}

window.pizzaChart = pizzaChart;
load_data();
