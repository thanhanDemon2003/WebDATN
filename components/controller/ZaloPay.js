const crypto = require("crypto");
const request = require("request");
const moment = require("moment");
const qs = require("qs");
const serviceZaloPay = require("../service/Zalopay.js");
const PaymentService = require("../service/Payment.js");


const ZaloPayCreate = async (req, res) => {
  try {
    const idPlayer = req.body.idPlayer;
    const amount = req.body.amount;
    console.log(idPlayer, amount);
    const config = {
      app_id: "2553",
      key1: "PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL",
      key2: "kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz",
      endpoint: "https://sb-openapi.zalopay.vn/v2/create",
    };
    const embed_data = {
      promotioninfo: "id",
      merchantinfo: "123456",
      redirecturl: "https://dotstudio.demondev.games/payment/thankyou",
    };
    const items = [{}];
    const transID = Math.floor(Math.random() * 1000000);
    const order = {
      app_id: config.app_id,
      app_trans_id: `${moment().format("YYMMDD")}_${transID}`,
      app_user: "Dot Studio",
      app_time: Date.now(),
      item: JSON.stringify(items),
      embed_data: JSON.stringify(embed_data),
      amount: amount,
      callback_url: "https://dotstudio.demondev.games/api/respaymentzalo",
      description: `DotStudio - Nạp tiền game Dark Disquite #${transID}`,
      bank_code: "",
    };
    console.log(order);
    const data =
      config.app_id +
      "|" +
      order.app_trans_id +
      "|" +
      order.app_user +
      "|" +
      order.amount +
      "|" +
      order.app_time +
      "|" +
      order.embed_data +
      "|" +
      order.item;
    order.mac = crypto
      .createHmac("sha256", config.key1)
      .update(data)
      .digest("hex");
    request.post(
      config.endpoint,
      { headers: { "Content-Type": "application/json" }, form: order },
      async (err, response, body) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log(body);
        const payment = await PaymentService.paymentZaloPayCreate(
          order,
          idPlayer
        );
        console.log(payment);
        
        serviceZaloPay.checkPaymentStatus(order.app_trans_id);
        return res.status(200).json({ success: true, data: body });
      }
    );
  } catch (error) {}
};
const VisaCreate = async (req, res) => {
  try {
    const idPlayer = req.body.idPlayer;
    const amount = req.body.amount;
    console.log(idPlayer, amount);
    const config = {
      app_id: "2553",
      key1: "PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL",
      key2: "kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz",
      endpoint: "https://sb-openapi.zalopay.vn/v2/create",
    };
    const embed_data = {
      promotioninfo: "id",
      merchantinfo: "123456",
      redirecturl: "https://dotstudio.demondev.games/payment/thankyou",
    };
    const items = [{}];
    const transID = Math.floor(Math.random() * 1000000);
    const order = {
      app_id: config.app_id,
      app_trans_id: `${moment().format("YYMMDD")}_${transID}`,
      app_user: "Dot Studio",
      app_time: Date.now(),
      item: JSON.stringify(items),
      embed_data: JSON.stringify(embed_data),
      amount: amount,
      callback_url: "https://dotstudio.demondev.games/api/respaymentzalo",
      description: `DotStudio - Nạp tiền game Dark Disquite #${transID}`,
      bank_code: "CC",
    };
    console.log(order);
    const data =
      config.app_id +
      "|" +
      order.app_trans_id +
      "|" +
      order.app_user +
      "|" +
      order.amount +
      "|" +
      order.app_time +
      "|" +
      order.embed_data +
      "|" +
      order.item;
    order.mac = crypto
      .createHmac("sha256", config.key1)
      .update(data)
      .digest("hex");
    request.post(
      config.endpoint,
      { headers: { "Content-Type": "application/json" }, form: order },
      async (err, response, body) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log(body);
        const payment = await PaymentService.paymentVisaPayCreate(
          order,
          idPlayer
        );
        console.log(payment);
        
        serviceZaloPay.checkPaymentStatus(order.app_trans_id);
        return res.status(200).json({ success: true, data: body });
      }
    );
  } catch (error) {}
};
const NapTienZaloPay = async (req, res) => {
  try {
    const sdt = req.query.sdt;
    const url =
      "https://zlpdev-mi-zlpdemo.zalopay.vn/zlp-demo/api/cashin?phone=" + sdt;

    const delay = 3000;
    await fetch(url);
    for (let i = 0; i < 200; i++) {
      request.post(url, (err, response, body) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log(body);
      });
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
    return res
      .status(200)
      .json({ success: true, notification: "Thành công", data: "Thành công" });
  } catch (error) {}
};

const ZaloPayData = async (req, res) => {
  try {
    const { data, mac } = req.query;
    const datazl = await serviceZaloPay.ZaloPayCreateData(data, mac);
    return res.status(200).json({ success: true, data: datazl });
  } catch (error) {
    return res.status(500).json({ success: false, error: error });
  }
};

module.exports = { NapTienZaloPay, ZaloPayCreate, ZaloPayData, VisaCreate };
