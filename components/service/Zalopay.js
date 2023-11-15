const ZaloPayModel = require("../model/ZaloPay.js");
const paymentService = require("../service/Payment.js");
const playerService = require("../service/Player.js");
const crypto = require("crypto");
const request = require("request");
const moment = require("moment");
const qs = require("qs");
const { clearInterval } = require("timers");

const ZaloPayCreateData = async (data, mac, type) => {
  const ZaloPay = new ZaloPayModel({
    appid: data.appid,
    apptransid: data.apptransid,
    apptime: data.apptime,
    appuser: data.appuser,
    amount: data.amount,
    embeddata: data.embeddata,
    item: data.item,
    zptransid: data.zptransid,
    servertime: data.servertime,
    channel: data.channel,
    merchantuserid: data.merchantuser,
    userfeeamount: data.userfeeamount,
    discountamount: data.discountamount,
    mac: mac,
  });
  await ZaloPay.save();
  return ZaloPay;
};

const checkZaloPay = async (app_trans_id) => {
  return new Promise((resolve, reject) => {
    try {
      const config = {
        app_id: "2553",
        key1: "PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL",
        key2: "kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz",
        endpoint: "https://sb-openapi.zalopay.vn/v2/query",
      };
      let postData = {
        app_id: config.app_id,
        app_trans_id: app_trans_id,
      };
      let data =
        postData.app_id + "|" + postData.app_trans_id + "|" + config.key1; // appid|app_trans_id|key1
      postData.mac = crypto
        .createHmac("sha256", config.key1)
        .update(data)
        .digest("hex");
      let postConfig = {
        url: config.endpoint,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        form: qs.stringify(postData),
      };
      request.post(postConfig, async (err, response, body) => {
        if (err) {
          resolve(err);
        }
        resolve(body);
      });
    } catch (err) {
      return err;
    }
  });
};

const checkPaymentStatus = async (app_trans_id) => {
  let count = 0;
  const timeNow = Date.now();
  let intervalId = setInterval(async () => {
    try {
      count++;
      const resAPI = await checkZaloPay(app_trans_id);
      const response = JSON.parse(resAPI);
      if (response.return_code == 1) {
        const trangthai = "PAID";
        const test = await paymentService.testPayement(app_trans_id)
        if(test.statusPayment == "PAID"){
          clearInterval(intervalId);
          return;
        }
        const resPayment = await paymentService.paymentZaloPayRes(
          app_trans_id,
          trangthai
        );
        const balance = resPayment.dotCoint;
        const idPlayer = resPayment.idPlayer;
        await playerService.updateDotCoin(idPlayer, balance);
        clearInterval(intervalId);
      } else if (response.return_code == 0) {
        const trangthai = "CANCELLED";
        await paymentService.paymentZaloPayRes(app_trans_id, trangthai);
        clearInterval(intervalId);
      } else if (
        response.return_code == 3 &&
        Date.now() - timeNow > 15 * 60 * 1000
      ) {
        const trangthai = "CANCELLED";
        await paymentService.paymentZaloPayRes(app_trans_id, trangthai);
        clearInterval(intervalId);
      }

    } catch (error) {
      clearInterval(intervalId);
    }
  }, 30000);
};
module.exports = { ZaloPayCreateData, checkZaloPay, checkPaymentStatus };
