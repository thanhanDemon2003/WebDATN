const PaymentService = require("../service/Payment.js");
const PlayerService = require("../service/Player.js");

const resPaymentController = async (req, res) => {
  try {
    const { orderCode, id, status } = req.query;
    const resPayment = await PaymentService.resPayment(orderCode, id, status);
    const balance = resPayment.dotCoint;
    const idPlayer = resPayment.idPlayer;
    if (status !== "PAID") {
      return res.status(200).json({ success: true, data: user }); 
    }
    const user = await PlayerService.updateDotCoin(idPlayer, balance);
    return res.status(200).json({ success: true, data: user }); 
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: error });
  }
};
module.exports = {resPaymentController}
