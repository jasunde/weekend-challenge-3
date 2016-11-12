$(document).ready(function () {
  // Handle calculator button clicks
  $('#calculator').on('click', 'button', function (event) {
    // if button is type=reset, empty form and result
    if(this.type === 'reset') {
      $('#result').empty();
    } else {
      calculate(this, event);
    }
  });
});

// Send the object to calculate via ajax
function calculate(button, event) {
  event.preventDefault();

  var data = {
    x: $('#x').val(),
    y: $('#y').val(),
    type: button.id
  };

  $.ajax({
    type: 'POST',
    url: '/calculate',
    data: data,
    success: getResult
  });
}

// Get the result via ajax
function getResult() {
  $.ajax({
    type: 'GET',
    url: '/calculate',
    success: showResult
  });
}

// Put result on the DOM
function showResult(result) {
  $('#result').text(result.value);
}
