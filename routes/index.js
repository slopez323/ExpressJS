var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/datetime', function(req, res, next) {
  res.render('date', { title: 'Date and Time', date: new Date().toString() });
  res.send(new Date().toString());
});

module.exports = router;
