var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Main page | some-thingy' });
  res.render('games/snake', { title: 'Snake | some-thingy' });
});

module.exports = router;
