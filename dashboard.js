$(document).ready(function () {
  let paymentModeChart = null;
  let spentForChart = null;

  function parseDate(dateString) {
    const parts = dateString.split("-");
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);
    return new Date(year, month, day);
  }

  // Event listener for Bootstrap tab shown event
  $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
    const targetTabId = $(e.target).attr("href");
    if (targetTabId === "#dashboard") {
      // Set default dates to current date
      const currentDate = getCurrentDate();
      $('#fromDate').val(currentDate);
      $('#toDate').val(currentDate);

      // Initial chart rendering with default dates
      updatePieChart(new Date(currentDate), new Date(currentDate));
    }
  });



  function updatePieChart(startDate, endDate) {
    var storedChartType = localStorage.getItem('chartType');
    if (paymentModeChart) {
      paymentModeChart.destroy(); // Destroy the previous chart instance if it exists
      spentForChart.destroy();
    }
    // Adjust startDate to include the beginning of the day (00:00:00)
    startDate.setHours(0, 0, 0);

    // Adjust endDate to include the whole day (up to 23:59:59)
    endDate.setHours(23, 59, 59);

    const existingData = JSON.parse(localStorage.getItem("FinDa") || "{}");

    const filteredData = Object.values(existingData)
      .reduce((acc, val) => acc.concat(val), [])
      .filter((item) => {
        const itemDate = parseDate(item.date);
        return itemDate >= startDate && itemDate <= endDate;
      });

    const paymentModes = filteredData.reduce((acc, val) => {
      acc[val.mode] = (acc[val.mode] || 0) + parseFloat(val.amount);
      return acc;
    }, {});

    const modeLabels = Object.keys(paymentModes);
    const modeAmounts = Object.values(paymentModes);



    const ctx = document.getElementById('paymentModeChart').getContext('2d');
    Chart.register(ChartDataLabels); // Register the datalabels plugin

    paymentModeChart = new Chart(ctx, {
      type: storedChartType,
      data: {
        labels: modeLabels,
        datasets: [{
          label: modeLabels,
          data: modeAmounts,
          backgroundColor: ['rgba(255, 99, 132, 0.7)', 'rgba(54, 162, 235, 0.7)', 'rgba(255, 206, 86, 0.7)', 'rgba(75, 192, 192, 0.7)', 'rgba(153, 102, 255, 0.7)'],
        }]
      },
      options: {
        plugins: {
          legend: {
            position:'bottom',
            display: (storedChartType === 'pie')? true: false
          },

          datalabels: { // Enable datalabels plugin
            formatter: (value, ctx) => {
              let label = modeLabels[ctx.dataIndex];
              let amount = modeAmounts[ctx.dataIndex].toFixed(2); // Round amount to 2 decimal places
              const percent = ((value / modeAmounts.reduce((acc, val) => acc + val, 0)) * 100).toFixed(2);
              return `${percent}%`;
            },
            color: '#123456', // Label text color
            anchor: 'end', // Position of the label relative to the data point
            align: 'start', // Label alignment
            offset: 10,
            display: 'auto'			// Label offset from the data point
          }
        },
        layout: {
          padding: {
            top: 10,
            bottom: 10,
          }
        },
        responsive: true,
        maintainAspectRatio: false

      }
    });


    const spentFor = filteredData.reduce((acc, val) => {
      acc[val.spentFor] = (acc[val.spentFor] || 0) + parseFloat(val.amount);
      return acc;
    }, {});

    const spentForLabel = Object.keys(spentFor);
    const spentForAmount = Object.values(spentFor);

    const spentForCtx = document.getElementById('spentForChart').getContext('2d');
    Chart.register(ChartDataLabels); // Register the datalabels plugin

    spentForChart = new Chart(spentForCtx, {
      type: storedChartType,
      data: {
        labels: spentForLabel,
        datasets: [{
          labels: spentForLabel,
          data: spentForAmount,
          backgroundColor: ['rgba(255, 99, 132, 0.7)', 'rgba(54, 162, 235, 0.7)', 'rgba(255, 206, 86, 0.7)', 'rgba(75, 192, 192, 0.7)', 'rgba(153, 102, 255, 0.7)'],
        }]
      },
      options: {
        plugins: {
          legend: {
            position:'bottom',
            display: (storedChartType === 'pie')? true: false
          },
          datalabels: { // Enable datalabels plugin
            formatter: (value, spentForCtx) => {
              let label = spentForLabel[spentForCtx.dataIndex];
              let amount = spentForAmount[spentForCtx.dataIndex].toFixed(2); // Round amount to 2 decimal places
              const percent = ((value / spentForAmount.reduce((acc, val) => acc + val, 0)) * 100).toFixed(2);
              return `${percent}%`;
            },
            color: '#123456', // Label text color
            anchor: 'end', // Position of the label relative to the data point
            align: 'start', // Label alignment
            offset: 10,
            display: 'auto'			// Label offset from the data point
          }
        },
        layout: {
          padding: {
            top: 10,
            bottom: 10,
          }
        },
        responsive: true,
        maintainAspectRatio: false

      }
    });


  }

  // Get the current date in "yyyy-mm-dd" format
  function getCurrentDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    let month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    let day = currentDate.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }


  // Listen to changes in the date fields and update the chart accordingly
  $('#fromDate, #toDate').on('change', function () {
    const startDate = new Date($('#fromDate').val());
    const endDate = new Date($('#toDate').val());
    updatePieChart(startDate, endDate);
  });
});
