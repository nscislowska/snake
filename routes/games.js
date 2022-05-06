var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/snake', function(req, res, next) {
    res.render('games/snake', { title: 'Snake | some-thingy' });

});

module.exports = router;