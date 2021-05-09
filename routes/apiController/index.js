var express = require('express');
var router = express.Router();

//api Controller
router.get("/", (req, res) => {
    res.send("Hello World");
});

module.exports = router;
