var express = require('express');
var router = express.Router();
const PlayerController = require("../components/controller/Player.js");
const VietQR = require("../components/controller/VietQr.js");
const paymentController = require("../components/controller/Payment.js");
const MoMo = require("../components/controller/Momo.js");
const ZaloPay = require("../components/controller/ZaloPay.js");
const Datauser = require("../components/controller/DataUserController.js");
/* GET users listing. */


router.get('/loginpayment', PlayerController.LoginPayToFacebook);
router.get('/loginpaymentdiscord', PlayerController.LoginPayToDiscord);

// router.post('/paymentmomo', PlayerController.PaymentMOMOController)
router.post('/paymentvietqr', VietQR.vietQrCreate);
router.post('/paymentmomo', MoMo.MomoCreate);
router.post('/paymentzalopay', ZaloPay.ZaloPayCreate);
router.post('/paymentvisa', ZaloPay.VisaCreate);

// router.post('/paymentdatazalopay', ZaloPay.ZaloPayData);


router.post('/respayment', paymentController.resPaymentController)
router.post('/respaymentzalo', paymentController.resPaymentZaloPay)

router.post('/naptienzalopay', ZaloPay.NapTienZaloPay);

router.get('/LoginGameWeb', PlayerController.LoginGameWeb);

router.post('/pushdatauser', PlayerController.CreateData);
router.get('/getdatauser', PlayerController.getDataUserController);
module.exports = router;
