var express = require('express');
var router = express.Router();
const fs = require('fs');

router.put('/', function(req, res) {
  const { filename, data } = req.body;
  fs.writeFile('../app/src/shopImages/' + filename, data);
});

module.exports = router;
