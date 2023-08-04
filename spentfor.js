$(document).ready(function () {
  // Load more modes from local storage on page load
  loadMoreSpentFromLocalStorage();

  $('#clearCache').click(function(){
    localStorage.removeItem('FinDa')
  })

  // Add Mode button click event
  $("#addSpentForBtn").click(function () {
    const modeText = $("#spentInput").val().trim();
    if (modeText !== "") {
      // Save mode to local storage
      addSpentToLocalStorage(modeText);

      // Clear input field after adding
      $("#spentInput").val("");

      // Update the modes table
      updateSpentTable();
    }
  });

  // Function to save mode to local storage
  function addSpentToLocalStorage(mode) {
    const existingModes = JSON.parse(localStorage.getItem("more-spent-for") || "[]");
    existingModes.push(mode);
    localStorage.setItem("more-spent-for", JSON.stringify(existingModes));
  }

  // Function to load more modes from local storage
  function loadMoreSpentFromLocalStorage() {
    const existingModes = JSON.parse(localStorage.getItem("more-spent-for") || "[]");
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
      removeSpentFromLocalStorage(modeToDelete);
      updateSpentTable();
    });
    tableRow.append($("<td>").append(deleteButton));
    $("#spentTableBody").append(tableRow);
  }

  // Function to remove mode from local storage
  function removeSpentFromLocalStorage(mode) {
    const existingModes = JSON.parse(localStorage.getItem("more-spent-for") || "[]");
    const updatedModes = existingModes.filter((item) => item !== mode);
    localStorage.setItem("more-spent-for", JSON.stringify(updatedModes));
  }

  // Function to update the modes table
  function updateSpentTable() {
    $("#spentTableBody").empty();
    loadMoreSpentFromLocalStorage();
  }
});
