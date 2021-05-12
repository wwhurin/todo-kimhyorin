var express = require('express');
var router = express.Router();

var view = require("./viewController/index");
var api = require("./apiController/index");

//view 요청 시 view용 Controller
router.use('/', view);
//api 요청 시 api 용 Controller 
router.use('/api', api);

module.exports = router;