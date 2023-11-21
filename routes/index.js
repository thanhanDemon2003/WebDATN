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
router.get("/logingame", function (req, res, next) {
  const stt = req.query.stt;
  if(!stt){
  res.render("404");
  }
  res.render("logingame", {stt});

});
router.get("/logingamesuccess", function (req, res, next) {
  res.render("logingamesuccess");
})
module.exports = router;
