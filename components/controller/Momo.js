require("dotenv").config({ path: "config.env" });
const crypto = require("crypto");
const request = require("request");

const MomoCreate = async (req, res) => {
  try {
    const partnerCode = process.env.PARTNER_CODE;
    const accessKey = process.env.ACCESS_KEY;
    const secretKey = process.env.SECRET_KEY;
    const partnerName = "DotStudio";
    const userInfo = { name: "Thành An-23123123123aadv" };
    const requestId = "123";
    const amount = 10000;
    const orderId = "123";
    const orderInfo = "Nạp tiền";
    const ipnUrl = "http://localhost:3001/payment/success";
    const redirectUrl = "http://localhost:3001/payment/success";
    const requestType = "payWithMethod";
    const extraData = "";
    const autoCapture = true;
    const orderExpireTime = 15;
    const lang = "vi";
    const data =
    "accessKey=" + accessKey + "&amount=" + amount + "&extraData=" + extraData + "&ipnUrl=" + ipnUrl + "&orderId=" + orderId + "&orderInfo=" + orderInfo + "&partnerCode=" + partnerCode + "&redirectUrl=" + redirectUrl + "&requestId=" + requestId + "&requestType=" + requestType;
    const signature = crypto
      .createHmac("sha256", secretKey)
      .update(data)
      .digest("hex");
    const dataApi = JSON.stringify({
        partnerCode : partnerCode,
        partnerName : partnerName,
        requestId : requestId,
        amount : amount,
        orderId : orderId,
        orderInfo : orderInfo,
        redirectUrl : redirectUrl,
        ipnUrl : ipnUrl,
        lang : lang,
        requestType: requestType,
        autoCapture: autoCapture,
        extraData : extraData,
        signature : signature
    });
    //   autoCapture: autoCapture,
    console.log(dataApi);
    console.log(secretKey);
    const options = {
      url: "https://test-payment.momo.vn/v2/gateway/api/create",
      Method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: dataApi
    };
    request.post(options, (err, response, body) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(body);
      return res
        .status(200)
        .json({ success: true, notification: "Thành công", data: body });
    });
  } catch (error) {}
};

const ZaloPayCreate = async (req, res) => {
  try {
    const app_id = 2553;
    const key1 = "PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL";
    const key2 = "Iyz2habzyr7AG8SgvoBCbKwKi3UzlLi3";
    const app_user = "Demon";
    const now = Date.now();
    const date = format(now, "yymmdd");
    const app_trans_id = ""
    const app_time = ""
    const callback_url = "http://localhost:3001/payment/resPaymentZaloPay";
    const amount = 10000;
    const item = "";
    const description = "Demon - Nạp tiền" + app_trans_id;
    const embed_data = "";
    const keyZaloPayKill =
      app_id +
      "|" +
      app_trans_id +
      "|" +
      app_user +
      "|" +
      amount +
      "|" +
      app_time +
      "|" +
      embed_data +
      "|" +
      item;
    const mac = crypto
      .createHmac("sha256", key1)
      .update(keyZaloPayKill)
      .digest("hex");
    const Params = {
      app_id: app_id,
      app_user: app_user,
      app_trans_id: app_trans_id,
      app_time: app_time,
      amount: amount,
      item: item,
      embed_data: embed_data,
      description: description,
      callback_url: callback_url,
      mac: mac,
    };
    console.log(Params);
    return res.status(200).json({ success: true, data: Params });
    // request.post({
    //   url: "https://sb-openapi.zalopay.vn/v2/create",
    //   form: { "Content-Type": "application/json" },
    //   qs: Params,
    // }, (err, response, body) => {
    //   if (err) {
    //     console.log(err);
    //     return;
    //   }
    //   console.log(body);
    //   return res
    //     .status(200)
    //     .json({ success: true, notification: "Thành công", data: body });
    // });
  } catch (error) {}
};
module.exports = { MomoCreate, ZaloPayCreate };
