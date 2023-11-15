const PaymentService = require("../service/Payment.js");
const PlayerService = require("../service/Player.js");
const crypto = require("crypto");

const resPaymentController = async (req, res) => {
  try {
    const { orderCode, id, status } = req.query;
    const resPayment = await PaymentService.resPayment(orderCode, id, status);
    if (status === "PAID") {
      const balance = resPayment.dotCoint;
      const idPlayer = resPayment.idPlayer;
      const user = await PlayerService.updateDotCoin(idPlayer, balance);
      return res.status(200).json({ success: true, data: user });
    }
    return res.status(200).json({ success: true, data: resPayment });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: error });
  }
};
const resPaymentZaloPay = async (req, res) => {
  try {
    const { status, apptransid } = req.query;
    let trangthai;
    if (status == 1) {
      trangthai = "PAID";
    } else {
      trangthai = "CANCELLED";
    }
    const resPayment = await PaymentService.paymentZaloPayRes(
      apptransid,
      trangthai
    );
    if (status == 1) {
      const balance = resPayment.dotCoint;
      const idPlayer = resPayment.idPlayer;
      const user = await PlayerService.updateDotCoin(idPlayer, balance);
      return res.status(200).json({ success: true, data: user });
    }
    return res.status(200).json({ success: true, data: resPayment });
  } catch (error) {
    return res.status(500).json({ success: false, error: error });
  }
};

module.exports = { resPaymentController, resPaymentZaloPay };
