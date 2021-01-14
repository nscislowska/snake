var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/escape', function(req, res, next) {
    res.render('games/escape', { title: 'Escape' });

});

router.get('/snake', function(req, res, next) {
    res.render('games/snake', { title: 'Snake' });

});

router.get('/research', function(req, res, next) {
    res.render('games/research', { title: 'Research' });

});

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Some Gamezzz' });

});

module.exports = router;