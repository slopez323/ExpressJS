var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Users page' });
  res.send('respond with a resource');
});

router.get('/myname', function(req, res, next) {
  res.render('users', { title: 'Name', name: 'Sarah' });
  res.send('Sarah');
});

router.get('/myfavoritemovies', function(req, res, next) {
  res.render('users-movies', { title: 'Movies', movies: ['The Proposal', 'Coda', 'Win a Date with Tad Hamilton'] });
  res.json(['The Proposal', 'Coda', 'Win a Date with Tad Hamilton']);
});

module.exports = router;
