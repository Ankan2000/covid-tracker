let chart;
const chartBlock = document.querySelector("#visualChart").getContext("2d");

export const updateChart = (infections, deaths, recovered, date) => {
  if (chart != undefined) {
    chart.destroy();
  }

  chart = new Chart(chartBlock, {
    type: "line",
    data: {
      labels: date,
      datasets: [
        {
          label: "Confirmed",
          data: infections,
          borderColor: "#008cff",
          pointRadius: 0,
        },
        {
          label: "Recovered",
          data: recovered,
          borderColor: "#25aa00",
          pointRadius: 0,
        },
        {
          label: "Deaths",
          data: deaths,
          borderColor: "#ff0000",
          pointRadius: 0,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  });
};

export const setGlobalChart = (chartData) => {
  if (chart != undefined) {
    chart.destroy();
  }

  chart = new Chart(chartBlock, {
    type: "line",
    data: {
      labels: chartData.map((data) => data.reportDate),
      datasets: [
        {
          label: "Confirmed",
          data: chartData.map((data) => data.confirmed.total),
          borderColor: "#008cff",
          pointRadius: 0,
        },
        {
          label: "Deaths",
          data: chartData.map((data) => data.deaths.total),
          borderColor: "#ff0000",
          pointRadius: 0,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  });
};
