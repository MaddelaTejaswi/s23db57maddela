var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('queen', { title: 'Search Results Queen' });
});

module.exports = router;