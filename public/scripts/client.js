$(document).ready(function () {
  var $display = $('#display');

  var data = {
    x: '0',
    y: '',
    z: '',
    type: '',
    type0: '',
    numClicked: false,
    opClicked: false,
    trailing: 'number'
  };

  appendNumbers();
  appendOperations();
  appendButton('', 'equals', '=', 'button');
  appendButton('', '', 'Clear', 'reset');

  // Handle equal button click
  $('#calculator').on('click', '.equals', function () {
    // if button is type=reset, empty form and result
    data.numClicked = false;
    data.opClicked = false;

    // When two operators and operator trailing
    if(data.trailing === 'operator' && data.type0.length) {
      
    }
    calculate();
  });

  // Handle operation selector buttons
  $('#calculator').on('click', '.operation', operatorHandler);

  // Handle number buttons
  $('#calculator').on('click', '.number', numberHandler);

  // Handle clear button
  $(':reset').on('click', function () {
    data = {
      x: '0',
      y: '',
      z: '',
      type: '',
      type0: '',
      numClicked: false,
      opClicked: false,
      trailing: 'number'
    };
    $('#result').empty();
  });

  function operatorHandler() {
    console.log('start operation handler');
    var operator = $(this).data('val');

    // First Time operator is clicked
    if(!data.opClicked) {
      data.opClicked = true;
      data.y = data.x;
      data.type = operator;

      // Succeeding times operator is clicked
    } else {

      // When number is trailing
      if(data.trailing === 'number') {

        // When two operators already stored
        if(data.type0.length) {
          // data.type is multiply or divide
          // data.type0 is add or subtract
          console.log('do calc');
          calculate(function () {
            // When current operator is add or subtract
            if(operator === 'add' || operator === 'subtract') {
              // var temp = data.y;
              data.y = data.x;
              data.x = data.z;
              data.z = '';
              data.type = data.type0;
              data.type0 = '';

              console.log('do calc');
              calculate(function () {
                data.y = data.x;
                data.type = operator;
              });

              // When current operator is multiply or divide
            } else {
              data.type = operator;
            }
          });

          // When only one operator is stored
        } else {
          // When previous operator is add or subtract
          console.log(data.type);
          if(data.type === 'add' || data.type === 'subtract') {
            // When current operator is add or subtract
            if(operator === 'add' || operator === 'subtract') {
              console.log('do calc');
              calculate();
              data.type = operator;
              // When current operator is multiply or divide
            } else {
              data.type0 = data.type;
              data.z = data.x;
              data.x = data.y;
              data.type = operator;
            }

            // When previous operator is multiply or divide
          } else {
            // In every case
            console.log('do calc');
            calculate();
            data.type = operator;
          }
        }


        // When operator is trailing
      } else {
        data.type = operator;
      }
    }

    // data.type = operator;
    data.trailing = 'operator';
    console.log(data.trailing);
    $('.operation').removeClass('active');
    $(this).addClass('active');

    console.log("Operator", data);
  }

  function numberHandler() {
    console.log('start number handler');
    // ({prev, x, y, type} = data);
    var val = $(this).data('val');

    // First time number is clicked
    if(!data.numClicked) {
      if(data.y.length) {
        data.x = data.y;
      } else {
        data.x = val;
      }
      data.y = val;
      data.numClicked = true;

      // Succeeding times number is clicked
    } else {

      if(data.trailing === 'operator') {

        // When there are two operators
        if(data.type0.length) {
          if(!data.z.length) console.log('missing z');
          // When there is one operator
        } else {
          if(data.z.length) console.log('should be no z');
        }

        data.y = val;
        // // When z exists
        // if(data.z.length > 0) {
        //   data.y = appendDigit(data.y, val);
        //
        // // When z does not exist
        // } else {
        //   data.z = data.x;
        //   data.x =data.y;
        //   data.y = val
        // }

        // When trailing number
      } else {
        data.y = appendDigit(data.y, val);
      }
    }

    $display.val(data.y);
    data.trailing = 'number';
    console.log(data.trailing);
    console.log("Number", data);
  }

  function appendDigit(val, digit) {
    if(digit !== '.' || !val.includes('.')) {
      val += digit;
    }
    return val;
  }

  // Add buttons to DOM
  function appendNumbers() {
    var numbers = ['7','8','9','4','5','6','1','2','3','0','.'];

    numbers.forEach(function (number) {
      appendButton(number, 'number', number, 'button');
    });
  }

  // Add operations to DOM
  function appendOperations() {
    var operations = [
      {name: 'divide', symbol: '÷'},
      {name: 'multiply', symbol: '\xd7'},
      {name: 'subtract', symbol: '-'},
      {name: 'add', symbol: '+'},
    ];

    operations.forEach(function (operation) {
      appendButton(operation.name, 'operation', operation.symbol, 'button');
    });
  }

  // Add button to DOM
  function appendButton(name, cls, text, type) {
    var $button = $('<button></button>');
    var $calculator = $('#calculator');
    $button.addClass('btn btn-default ' + cls)
    .attr('type', type)
    .data('val', name)
    .text(text);
    $calculator.append($button);
  }

  // Send the object to calculate via ajax
  function calculate(fn) {

    console.log("Calculation", data)

    $.ajax({
      type: 'POST',
      url: '/calculate',
      data: data,
      success: function() {
        getResult(fn);
      }
    });
  }

  // Get the result via ajax
  function getResult(fn) {
    $.ajax({
      type: 'GET',
      url: '/calculate',
      success: function (result) {
        data.x = result.value.toString();
        showResult(result);
        // Call the callback after calculate process
        if(typeof fn === 'function') {
          fn();
        }
      }
    });
  }

  // Put result on the DOM
  function showResult(result) {
    $('#display').val(result.value);
  }
});
