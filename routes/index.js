var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Main page' });
  res.render('snake/snake', { title: 'Snake | snake-111' });
});

module.exports = router;
