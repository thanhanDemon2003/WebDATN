const { request } = require("express");
const Player = require("../model/Player.js");
const PlayerService = require("../service/Player.js");


const LoginPayToFacebook = async (req, res, next) => {
    try {
      const tokenFB = req.query.token;
      if(!tokenFB){
        return res.status(400).json({ error: 1, notification: "ID fb trống" });
      }
      const login = await PlayerService.LoginFacebookPayment(tokenFB);
      if (!login) {
        return res
          .status(200)
          .json({ error: true, notification: "Bạn không có tài khoản, vui lòng tạo tài khoản trong game" });
      }
      if (login.status == 1) {
        return res
          .status(200)
          .json({ error: true, notification: "Tài khoản này đã bị khóa" });
      }
      return res.status(200).json({ success: true, notification: "Đăng nhập thành công", user: login._id, name: login.name });
    } catch (error) {
      res.status(500).json({ error: 2, notification: "Lỗi server" });
    }
  };
  const LoginPayToDiscord = async (req, res, next) => {
    try {
      const id_discord = req.query.id;
      if(!id_discord){
        return res.status(400).json({ error: 1, notification: "ID discord trống" });
      }
      const login = await PlayerService.LoginPayToDiscord(id_discord);
      if (!login) {
        return res
          .status(200)
          .json({ error: true, notification: "Bạn không có tài khoản, vui lòng tạo tài khoản trong game" });
      }
      if (login.status == 1) {
        return res
          .status(400)
          .json({ success: false, notification: "Tài khoản này đã bị khóa" });
      }
      return res.status(200).json({ success: true, notification: "Đăng nhập thành công", user: login._id, name: login.name });
    } catch (error) {
      res.status(500).json({ error: 2, notification: "Lỗi server" });
    }
  
  }




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
module.exports = {LoginPayToFacebook, LoginPayToDiscord}