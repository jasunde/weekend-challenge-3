var express = require('express')
var app = express()
var bodyParser = require('body-parser')

var index = require('./routes/index')

app.set('port', process.env.PORT || 3000)

app.get('/', index)

app.listen(app.get('port'), function() {
  console.log('Listening on port ' + app.get('port') + '...');
})
