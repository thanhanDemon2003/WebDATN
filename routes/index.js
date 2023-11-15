var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index");
});
router.get("/loginpayment", function (req, res, next) {
  res.render("login");
});
router.get("/payment", function (req, res, next) {
  res.render("payment");
});
router.get("/payment/thankyouvietqr", function (req, res, next) {
  const { orderCode, id, status } = req.query;
  res.render("thankyouvietqr", { orderCode, id, status });
});
router.get("/payment/thankyou", function (req, res, next) {
  const { apptransid, status } = req.query;
  res.render("thankyou", { apptransid, status });
});
module.exports = router;
