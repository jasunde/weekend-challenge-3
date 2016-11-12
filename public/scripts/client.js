$(document).ready(function () {
  $x = $('#x');
  $y = $('#y');

  // Handle equal button click
  $(':submit').on('click', function (event) {
    // if button is type=reset, empty form and result
    calculate(event);
  });

  // Handle operation selector buttons
  $('.operation').on('click', function () {
    $('.operation').removeClass('active');
    $(this).addClass('active');
  });

  // Handle number buttons
  $('.number').on('click', function() {
    if($x.val() === '') {
      $x.val($(this).val());
    } else if($y.val() === '') {
      $y.val($(this).val());
    }
  });

  // Handle clear button
  $(':reset').on('click', function () {
    $('#result').empty();
  })
});

// Send the object to calculate via ajax
function calculate(event) {
  event.preventDefault();

  var data = {
    x: $x.val(),
    y: $y.val(),
    type: $('.operation.active').attr('id')
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
