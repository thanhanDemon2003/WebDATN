var express = require('express');
var router = express.Router();
const PlayerController = require("../components/controller/Player.js");
/* GET users listing. */


router.get('/loginpayment', PlayerController.LoginPayToFacebook)


module.exports = router;
