var express = require('express')
var router = express.Router()
var result = {value: 0};

router.post('/add', function (req, res) {
  result.value = evaluate(req.body)
  res.sendStatus(201)
})

router.post('/subtract', function (req, res) {
  result.value = evaluate(req.body)
  res.sendStatus(201)
})

router.post('/multiply', function (req, res) {
  result.value = evaluate(req.body)
  res.sendStatus(201)
})


router.post('/divide', function (req, res) {
  result.value = evaluate(req.body)
  res.sendStatus(201)
})

router.get('/', function (req, res) {
  res.send(result)
})

function evaluate({x: x, y: y, type: type}) {
  x = parseFloat(x)
  y = parseFloat(y)

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
