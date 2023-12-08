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

function load_data() {
  labels = ["Particular", "Plano de Saúde"];
  data = [10, 20];
  backgroundColor = ["#a9cf3c", "#f6821f"];
  borderColor = [];
  borderWidth = 1;
  element = "pizza";
  pizzaChart(labels, data, backgroundColor, borderColor, borderWidth, element);

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
    (element = "bar"),
    (label_name = "Quantidade de Pacientes")
  );
}

window.pizzaChart = pizzaChart;
load_data();
