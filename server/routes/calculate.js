var express = require('express')
var router = express.Router()
var result = {value: 0};

router.post('/', function (req, res) {
  result.value = evaluate(req.body)
  res.sendStatus(201)
})

router.get('/', function (req, res) {
  res.send(result)
})

function evaluate({x: x, y: y, type: type}) {
  x = parseInt(x)
  y = parseInt(y)

  switch(type) {
    case 'add':
      return x + y
    case 'subtract':
      return x - y
    case 'multiply':
      return x * y
    case 'divide':
      return x / y
  }
}

module.exports = router
