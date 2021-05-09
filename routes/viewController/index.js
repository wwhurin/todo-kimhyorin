var express = require('express');
var router = express.Router();

/* 클라이언트 Contoller */
router.get('/', function(req, res) {
    res.render('index', { title: 'Start' });
});

module.exports = router;