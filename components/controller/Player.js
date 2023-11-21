const { request } = require("express");
const Player = require("../model/Player.js");
const PlayerService = require("../service/Player.js");
const moment = require("moment");
const fs = require("fs");

const datauserService = require("../service/Datauser.js")





const LoginPayToFacebook = async (req, res, next) => {
  try {
    const tokenFB = req.query.token;
    if (!tokenFB) {
      return res.status(400).json({ error: 1, notification: "ID fb trống" });
    }
    const login = await PlayerService.LoginFacebookPayment(tokenFB);
    if (!login) {
      return res.status(200).json({
        error: true,
        notification:
          "Bạn không có tài khoản, vui lòng tạo tài khoản trong game",
      });
    }
    if (login.status == 1) {
      return res
        .status(200)
        .json({ error: true, notification: "Tài khoản này đã bị khóa" });
    }
    return res.status(200).json({
      success: true,
      notification: "Đăng nhập thành công",
      user: login._id,
      name: login.name,
    });
  } catch (error) {
    res.status(500).json({ error: 2, notification: "Lỗi server" });
  }
};
const LoginPayToDiscord = async (req, res, next) => {
  try {
    const id_discord = req.query.id;
    if (!id_discord) {
      return res
        .status(400)
        .json({ error: 1, notification: "ID discord trống" });
    }
    const login = await PlayerService.LoginPayToDiscord(id_discord);
    if (!login) {
      return res.status(200).json({
        success: false,
        notification:
          "Bạn không có tài khoản, vui lòng tạo tài khoản trong game",
      });
    }
    if (login.status == 1) {
      return res
        .status(400)
        .json({ success: false, notification: "Tài khoản này đã bị khóa" });
    }
    return res.status(200).json({
      success: true,
      notification: "Đăng nhập thành công",
      user: login._id,
      name: login.name,
    });
  } catch (error) {
    res.status(500).json({ success: false, notification: "Lỗi server" });
  }
};
const LoginGameWeb = async (req, res, next) => {
  try {
    const random = Math.floor(Math.random() * 10000);
    const stt = `${moment().format("YYMMDD")}${random}`;
    console.log(stt);
    const url = "http://localhost:3001/logingame?stt=" + stt;
    return res.status(200).json({ success: true, url: url, stt: stt });
  } catch (error) {}
};


// const PushPlayerFromWeb = async (req, res, next) => {
//   try {
//     const { stt, token, method } = req.query;
//     if (!stt || !token || !method) {
//       return res.status(400).json({ error: 1, notification: "Tham số trống" });
//     }

//     SttUser.push({ stt, token, method });
//     console.log(SttUser);

//     return res.status(200).json({ success: true, notification: "Thành công" });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: 1, notification: "Lỗi server" });
//   }
// }

const CreateData = async (req, res, next) => {

    try {
       const { stt, token, method, name } = req.query;
        console.log(stt, token, method);
        if (!stt || !token || !method) {
            return res.status(400).json({ success: false, notification: "Thiếu dữ liệu" });
        }
        const datauser = await datauserService.create(stt, token, method, name);
        if (!datauser) {
            return res.status(400).json({ success: false, notification: "Tạo thất bại" });
        }
        return res.status(200).json({ success: false, notification: "Tạo thành công" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, notification: "Lỗi server" });
    }
}
const getDataUserController = async (req, res, next ) => {
    try {
        const { stt } = req.query;
        if (!stt) {
            return res.status(400).json({ success: false, notification: "Thiếu dữ liệu" });
        }
        const datauser = await datauserService.get(stt);
        if (!datauser) {
            return res.status(400).json({ success: false, notification: "Tài khoản chưa đăng nhập vui lòng kiểm tra lại" });
        }
        return res.status(200).json({ method: datauser.method, token: datauser.token, name: datauser.name });
    } catch (error) {
        console.log(error);

        return res.status(500).json({ success: false, notification: "Lỗi server" });
    }

}
// const saveFile = async () => {
//     const fs = require("fs");
//     fs.writeFile(SttUser, JSON.stringify(SttUser), (err) => {
//       if (err) throw err;
//       console.log("Data has been saved to SttUser.json");
//     });
// };
// const PaymentMOMOController = (req, res) => {
//       const {orderID, amount, orderInfo} = req.body;
//       const body = PlayerService.PaymentMOMO(orderID, amount, orderInfo);
//       console.log(body);
//     if (!body) {
//       return res.status(400).json({ success: false, notification: "lỗi" });

//     }
//     const options = {
//       hostname: 'test-payment.momo.vn',
//       port: 443,
//       path: '/v2/gateway/api/create',
//       method: 'POST',
//       headers: {
//           'Content-Type': 'application/json',
//           'Content-Length': Buffer.byteLength(body)
//       }
//   }
//   request.post(options, function(error, response, body) {
//           if (error) {
//             console.log(error);
//           } else {
//            data = JSON.parse(body);
//            return res.status(200).json({ success: true, notification: "Thành công", data: momo });
//           }
//         }
//       );

//   }
module.exports = {
  LoginPayToFacebook,
  LoginPayToDiscord,
  LoginGameWeb,
  CreateData,
  getDataUserController
};
