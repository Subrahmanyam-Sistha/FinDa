$(document).ready(function () {
  // Load more modes from local storage on page load
  loadMoreModesFromLocalStorage();

  // Add Mode button click event
  $("#addModeBtn").click(function () {
    const modeText = $("#modeInput").val().trim();
    if (modeText !== "") {
      // Save mode to local storage
      addModeToLocalStorage(modeText);

      // Clear input field after adding
      $("#modeInput").val("");

      // Update the modes table
      updateModesTable();
    }
  });

  // Function to save mode to local storage
  function addModeToLocalStorage(mode) {
    const existingModes = JSON.parse(localStorage.getItem("moremodes") || "[]");
    existingModes.push(mode);
    localStorage.setItem("moremodes", JSON.stringify(existingModes));
  }

  // Function to load more modes from local storage
  function loadMoreModesFromLocalStorage() {
    const existingModes = JSON.parse(localStorage.getItem("moremodes") || "[]");
    for (const mode of existingModes) {
      addModeToTable(mode);
    }
  }

  // Function to add mode to the modes table
  function addModeToTable(mode) {
    const tableRow = $("<tr>");
    tableRow.append($("<td>").text(mode));
    const deleteButton = $("<button>").addClass("btn btn-danger btn-sm").text("Delete");
    deleteButton.click(function () {
      // Remove mode from local storage and update the table
      const modeToDelete = $(this).closest("tr").find("td:first").text();
      removeModeFromLocalStorage(modeToDelete);
      updateModesTable();
    });
    tableRow.append($("<td>").append(deleteButton));
    $("#modeTableBody").append(tableRow);
  }

  // Function to remove mode from local storage
  function removeModeFromLocalStorage(mode) {
    const existingModes = JSON.parse(localStorage.getItem("moremodes") || "[]");
    const updatedModes = existingModes.filter((item) => item !== mode);
    localStorage.setItem("moremodes", JSON.stringify(updatedModes));
  }

  // Function to update the modes table
  function updateModesTable() {
    $("#modeTableBody").empty();
    loadMoreModesFromLocalStorage();
  }

  var storedChartType = localStorage.getItem('chartType');

  if (storedChartType) {
    // Set the radio button value to the stored value
    $('input[name="chartType"][value="' + storedChartType + '"]').prop('checked', true);
  } else {
    // Default to Bar chart if no value in local storage
    $('input[name="chartType"][value="bar"]').prop('checked', true);
    localStorage.setItem('chartType', 'bar');
  }

  // Event listener for radio button change
  $('input[name="chartType"]').on('change', function() {
    var selectedChartType = $('input[name="chartType"]:checked').val();

    // Save the selected value to local storage
    localStorage.setItem('chartType', selectedChartType);
  });

});
