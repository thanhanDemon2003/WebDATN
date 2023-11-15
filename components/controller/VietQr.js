require("dotenv").config({ path: "config.env" });
const crypto = require("crypto");
const request = require("request");
const paymentService = require("../service/Payment.js");
const playerService = require("../service/Player.js");

const vietQrCreate = async (req, res) => {
  const amount = req.body.amount;
  const orderCode = await paymentService.orderCode();
  const buyerName = req.body.id_Player;
  const now = Math.floor(Date.now() / 1000);
  const expiredAt = now + 15 * 60;
  const description = "Nạp Tiền";
  const returnUrl = "https://dotstudio.demondev.games/payment/thankyouvietqr";
  const cancelUrl = "https://dotstudio.demondev.games/payment/thankyouvietqr";
  const methodPayment = "vietqr";
  const secretKey = process.env.CHECKSUM_KEY;
  const data = `amount=${amount}&cancelUrl=${cancelUrl}&description=${description}&orderCode=${orderCode}&returnUrl=${returnUrl}`;
  const signature = crypto
    .createHmac("sha256", secretKey)
    .update(data)
    .digest("hex");
  const dataApi = JSON.stringify({
    amount: amount,
    cancelUrl: cancelUrl,
    description: description,
    orderCode: orderCode,
    returnUrl: returnUrl,
    buyerName: buyerName,
    expiredAt: expiredAt,
    signature: signature,
  });
  const options = {
    url: "https://api-merchant.payos.vn/v2/payment-requests",
    body: dataApi,
    headers: {
      "Content-Type": "application/json",
      "x-client-id": process.env.CLIENT_ID,
      "x-api-key": process.env.API_KEY,
    },
  };
  request.post(options, (err, response, body) => {
    if (err) {
      return;
    }
    const payment = paymentService.paymentCreate(dataApi, methodPayment);
    return res.status(200).json({ success: true, notification: "Thành công", data : body });
  });
};

module.exports = { vietQrCreate };
