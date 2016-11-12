var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var path = require('path')

var index = require('./routes/index')
var calculate = require('./routes/calculate')

app.use(bodyParser.urlencoded({extended: false}))

app.get('/', index)

app.use('/calculate', calculate)

app.use(express.static(path.join(__dirname, '../public/')))

app.set('port', process.env.PORT || 3000)

app.listen(app.get('port'), function() {
  console.log('Listening on port ' + app.get('port') + '...')
})
