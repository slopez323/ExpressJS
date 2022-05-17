var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users', { title: 'Users' });
  // res.send('respond with a resource');
});

router.get('/myname', function(req, res, next) {
  res.send('Sarah');
});

router.get('/myfavoritemovies', function(req, res, next) {
  res.json(['The Proposal', 'Coda', 'Win a Date with Tad Hamilton']);
});

module.exports = router;
