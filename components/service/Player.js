const PlayerModel = require("../model/Player");
const crypto = require("crypto");

const LoginFacebookPayment = async (tokenFB) => {
  const user = await PlayerModel.findOne({ fb_id: tokenFB });
  return user;
};
const updateDotCoin = async (id, dotCoint) => {
  console.log(id, dotCoint);
  const user = await PlayerModel.findById(id);
  let newBalance = Number(user.balance) + dotCoint;
  user.balance = newBalance;
  await user.save();
  return user;
};

const PaymentMOMO = (orderID, amount, orderInfo) => {
  const partnerCode = "MOMOOJOI20210710";
  const extraData = "";
  const requestId = orderID;
  const orderGroupId = "";
  const paymentCode = "MOMO_WALLET";
  const accessKey = "iPXneGmrJH0G8FOP";
  const secretKey = "sFcbSGRSJjwGxwhhcEktCHWYUuTuPNDB";
  const requestType = "captureWallet";

  const rawSignature =
    "accessKey=" +
    accessKey +
    "&amount=" +
    amount +
    "&extraData=" +
    extraData +
    "&orderId=" +
    orderID +
    "&orderInfo=" +
    orderInfo +
    "&partnerCode=" +
    partnerCode +
    "&paymentCode=" +
    paymentCode +
    "&requestId=" +
    requestId;
  const signature = crypto
    .createHmac("sha256", secretKey)
    .update(rawSignature)
    .digest("hex");
  const requestBody = JSON.stringify({
    partnerCode: partnerCode,
    accessKey: accessKey,
    requestId: requestId,
    amount: amount,
    orderId: orderID,
    orderInfo: orderInfo,
    redirectUrl: "https://dotstudio.demondev.games/payment",
    ipnUrl: "https://dotstudio.demondev.games/payment",
    extraData: extraData,
    requestType: requestType,
    signature: signature,
    lang: "vi",
  });
  return requestBody;
};

module.exports = { LoginFacebookPayment, PaymentMOMO, updateDotCoin };
