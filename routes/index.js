var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',);
});
router.get("/loginpayment", function(req, res, next) {
  res.render('login');
})
router.get("/payment", function(req, res, next) {
  const id = req.query.id;
  const name = req.query.name;
  res.render('payment',{id: id, name: name});
})
router.get("/payment/success", function(req, res, next) {
  const orderCode = req.query.orderCode;
  const id = req.query.id;
  res.render('success', { orderCode: orderCode, id: id });

})
router.get("/payment/fail", function(req, res, next) {
  const orderCode = req.query.orderCode;
  const id = req.query.id;
  res.render('fail', { orderCode: orderCode, id: id });
})
module.exports = router;
