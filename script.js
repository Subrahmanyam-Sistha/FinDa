// Function to get the current date and time in "dd-mm-yyyy HH:MM" format

function getCurrentDate() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  let month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  let day = currentDate.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}


function getCurrentTime() {
  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const year = currentDate.getFullYear();
  const hours = String(currentDate.getHours()).padStart(2, "0");
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");
  return hours + ":" + minutes;
}

// Function to set the 'moremodes' array in local storage
function setMoreModesInLocalStorage() {
  const moreModes = [];
  localStorage.setItem("moremodes", JSON.stringify(moreModes));
}

// Function to load the 'moremodes' array from local storage and populate the dropdown
function loadMoreModesFromLocalStorage() {
  const moreModesDropdown = $("#moreModesDropdown");
  const moreModes = JSON.parse(localStorage.getItem("moremodes"));

  moreModes && moreModes.forEach(function (mode) {
    const listItem = $(
      "<li><a href='#' data-mode='" +
      mode +
      "' data-input='mode-dropdown'>" +
      mode +
      "</a></li>"
    );
    moreModesDropdown.append(listItem);
  });
}

// Function to set the 'more-spent-for' array in local storage
function setMoreSpentForInLocalStorage() {
  const moreSpentFor = [];
  localStorage.setItem("more-spent-for", JSON.stringify(moreSpentFor));
}

// Function to load the 'more-spent-for' array from local storage and populate the dropdown
function loadMoreSpentForFromLocalStorage() {
  const moreSpentForDropdown = $("#moreSpentForDropdown");
  const moreSpentFor = JSON.parse(localStorage.getItem("more-spent-for"));

  moreSpentFor && moreSpentFor.forEach(function (spentFor) {
    const listItem = $(
      "<li><a href='#' data-spent-for='" +
      spentFor +
      "' data-input='spent-for-dropdown'>" +
      spentFor +
      "</a></li>"
    );
    moreSpentForDropdown.append(listItem);
  });
}

function refreshDropdowns() {
  $("#moreModesDropdown").empty();
  $("#moreSpentForDropdown").empty();

  $("#modeDropdownButton").html("More" + ' <span class="caret"></span>');
  $("#spentForDropdownButton").html("More" + ' <span class="caret"></span>');


  loadMoreModesFromLocalStorage();
  loadMoreSpentForFromLocalStorage();
}

function loadPaymentMode(){

        // Sample data from localStorage (replace this with your actual data)
        var moreModes = JSON.parse(localStorage.getItem("moremodes"));

        if(!moreModes || moreModes.length === 0){
          moreModes = ['Cash','GPay','PhonePe','Debit Card','Credit Card'];
          localStorage.setItem("moremodes", JSON.stringify(moreModes));
        }

        // Function to divide array into groups of three
        function chunkArray(arr, size) {
          var chunks = [];
          for (var i = 0; i < arr.length; i += size) {
            chunks.push(arr.slice(i, i + size));
          }
          return chunks;
        }

        // Divide the data into groups of three
        var rows = chunkArray(moreModes, 3);
  
        // Build the dynamic radio buttons
        var html = '';
        rows.forEach(function(row) {
          html += '<div class="form-group">';
          html += '<div class="items">';
          row.forEach(function(option) {
            
            html += '<label class="radio-inline">';
            html += '<input type="radio" name="mode" value="' + option + '">';
            html += option;
            html += '</label>';

          });
          // Add the container for the last row if needed
          if (row.length < 3) {
            var emptyCols = 3 - row.length;
            for (var i = 0; i < emptyCols; i++) {
              html += '<div class="items">&nbsp;</div>';
            }
          }
          html += '</div>';
          html += '</div>';
        });
  
        // Insert the dynamic radio buttons into the container
        $('#paymentModeContainer').html(html);
  


}

function loadSpentFor(){

  // Sample data from localStorage (replace this with your actual data)
  let spentFor = JSON.parse(localStorage.getItem("more-spent-for"));

  if(!spentFor || spentFor.length === 0){
    spentFor = ['Food','Groceiries'];
    localStorage.setItem("more-spent-for", JSON.stringify(spentFor));
  }

  // Function to divide array into groups of three
  function chunkArray(arr, size) {
    var chunks = [];
    for (var i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  }

  // Divide the data into groups of three
  var rows = chunkArray(spentFor, 3);

  // Build the dynamic radio buttons
  var html = '';
  rows.forEach(function(row) {
    html += '<div class="form-group">';
    html += '<div class="items">';
    row.forEach(function(option) {
      
      html += '<label class="radio-inline">';
      html += '<input type="radio" name="spentFor" value="' + option + '">';
      html += option;
      html += '</label>';

    });
    // Add the container for the last row if needed
    if (row.length < 3) {
      var emptyCols = 3 - row.length;
      for (var i = 0; i < emptyCols; i++) {
        html += '<div class="items">&nbsp;</div>';
      }
    }
    html += '</div>';
    html += '</div>';
  });

  // Insert the dynamic radio buttons into the container
  $('#spentForContainer').html(html);

}



function getFormattedDate(dateString) {
  // Split the date and time parts
  var parts = dateString.split(' ');
  var datePart = parts[0]; // Get the date part

  // Split the date into day, month, and year parts
  var dateParts = datePart.split('-');
  var day = dateParts[2];
  var month = dateParts[1];
  var year = dateParts[0];

  // Reassemble the date in the desired format
  var formattedDate = day + '-' + month + '-' + year;

  return formattedDate;
}

loadPaymentMode();
loadSpentFor();

$(document).ready(function () {

  
  $('#danger').hide();
  $('#success').hide();
  //setMoreModesInLocalStorage();
  loadMoreModesFromLocalStorage();
  //setMoreSpentForInLocalStorage();
  loadMoreSpentForFromLocalStorage();

  // Event listener for Bootstrap tab shown event
  $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
    const targetTabId = $(e.target).attr("href");
    if (targetTabId === "#home") {
      // Refresh dropdowns on Home tab shown
      loadPaymentMode();
      loadSpentFor();
      //refreshDropdowns();
    }
  });

  $("#date").val(getCurrentDate());
  $("#time").val(getCurrentTime());

  $(".dropdown-menu a").click(function (event) {
    event.preventDefault();
    const inputType = $(this).data("input");
    const selectedValue = $(this).data(inputType === "mode-dropdown" ? "mode" : "spent-for");
    const dropdownButtonId = inputType === "mode-dropdown" ? "modeDropdownButton" : "spentForDropdownButton";
    $("#" + dropdownButtonId).html(selectedValue + ' <span class="caret"></span>');

    // Reset the related radio buttons when a dropdown is selected
    if (inputType === "mode-dropdown") {
      $('input[name="mode"]').prop("checked", false);
    } else {
      $('input[name="spentFor"]').prop("checked", false);
    }
  });


  $("input[data-input='radio']").click(function () {
    const inputName = $(this).attr("name");
    const inputType = $(this).data("input");
    const dropdownButtonId =
      inputName === "mode" ? "modeDropdownButton" : "spentForDropdownButton";
    $("#" + dropdownButtonId).html("More" + ' <span class="caret"></span>');
  });

  $("#saveBtn").click(function () {
    const formData = $("#dataForm").serializeArray();
    const jsonData = {};
    formData.forEach(function (entry) {
      jsonData[entry.name] = entry.value;
    });

    const selectedRadioMode = $("input[name='mode']:checked").val();
    if (selectedRadioMode) {
      jsonData.mode = selectedRadioMode;
    } else {
      const selectedDropdownMode = $("#modeDropdownButton").text().trim();
      jsonData.mode = selectedDropdownMode === "More" ? "" : selectedDropdownMode;
    }

    const selectedRadioSpentFor = $("input[name='spentFor']:checked").val();
    if (selectedRadioSpentFor) {
      jsonData.spentFor = selectedRadioSpentFor;
    } else {
      const selectedDropdownSpentFor = $("#spentForDropdownButton").text().trim();
      jsonData.spentFor = selectedDropdownSpentFor === "More" ? "" : selectedDropdownSpentFor;
    }


    const currentDate = getFormattedDate($("#date").val());

    jsonData.date = currentDate;

    jsonData.datetime = currentDate + ' '+ $("#time").val();

    console.log(jsonData);

    if (!jsonData.time || !jsonData.amount || !jsonData.mode || !jsonData.spentFor) {
      $('#danger').show(500);
      setTimeout(() => {
        $('#danger').hide(500)
      }, 2000)
      return;
    }

    const existingData = JSON.parse(localStorage.getItem("FinDa") || "{}");

    if (!existingData[currentDate]) {
      existingData[currentDate] = [];
    }

    existingData[currentDate].push(jsonData);
    localStorage.setItem("FinDa", JSON.stringify(existingData));
    $("#dataForm")[0].reset();

    $("#date").val(getCurrentDate());
    $("#time").val(getCurrentTime());
    //refreshDropdowns();
    console.log(jsonData);

    $('#success').show(100);
    setTimeout(() => {
      $('#success').hide(500)
    }, 2000)
    return;


  });

  $("#amount").on("input", function () {
    const value = $(this).val();
    const pattern = /^\d+(\.\d{0,2})?$/;
    if (!pattern.test(value)) {
      $(this).val(value.slice(0, -1));
    }
  });
});
