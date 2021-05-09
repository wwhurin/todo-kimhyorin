var express = require('express');
var router = express.Router();
const { todo_list } = require('../../models');

//api Controller
router.get("/", (req, res) => {
    const test = todo_list.findAll({});
    res.send(`${test}`);
});

module.exports = router;
