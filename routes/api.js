var express = require('express');
var router = express.Router();
const PlayerController = require("../components/controller/Player.js");
const VietQR = require("../components/controller/VietQr.js");
const paymentController = require("../components/controller/Payment.js");
/* GET users listing. */


router.get('/loginpayment', PlayerController.LoginPayToFacebook)
// router.post('/paymentmomo', PlayerController.PaymentMOMOController)
router.post('/paymentvietqr', VietQR.vietQrCreate)

router.post('/respayment', paymentController.resPaymentController)

module.exports = router;
