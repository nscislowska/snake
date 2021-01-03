var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/snake', function(req, res, next) {
    res.render('snake', { title: 'Snake' });

});

router.get('/', function(req, res, next) {
    res.render('game', { title: 'Games' });

});

module.exports = router;