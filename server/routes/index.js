var path = require('path')
console.log(process.cwd());

module.exports = function(req, res) {
  res.sendFile(path.resolve('./public/views/index.html'))
}
