var express = require('express');
var path = require('path');

var router = express.Router();

router.get('/', function(req, res) {
  res.sendFile('/views/index.html');
});

router.get('/inner', function(req, res) {
  res.sendFile('/views/inner.html');
});

module.exports = router;
