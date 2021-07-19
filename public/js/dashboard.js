const xhr = new XMLHttpRequest();

let complaints = 0,
  reports = 0;

function getDashboardData() {
  xhr.open("GET", "/dashboard", true);
  xhr.responseType = "json";
  xhr.onload = function () {
    const data = xhr.response;
    complaints = data.complaints;
    reports = data.reports;
    var ctx = document.getElementById("myChart").getContext("2d");
    var myChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Reports", "Complaints"],
        datasets: [
          {
            label: "",
            data: [reports, complaints],
            backgroundColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
            borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: "Data",
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    var reportsId = document.getElementById("reports").getContext("2d");
    var myChart = new Chart(reportsId, {
      type: "pie",
      data: {
        labels: ["Open", "Closed"],
        datasets: [
          {
            label: "Records",
            data: [data.open, data.closed],
            backgroundColor: ["#dc3545", "#198754"],
            borderColor: ["#dc3545", "#198754"],
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: "Records",
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  };
  xhr.send();
}
getDashboardData();
