var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get("/loginpayment", function(req, res, next) {
  res.render('login');
})
router.get("/payment", function(req, res, next) {
  res.render('payment');
})
module.exports = router;
