var express = require('express');
var router = express.Router();

/* 클라이언트 Contoller */
router.get('/:page', function(req, res) {
    const {page} = req.params;
    res.render('index', { title: 'todo list', page });
});

module.exports = router;