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
          .status(400)
          .json({ success: false, notification: "Bạn không có tài khoản, vui lòng tạo tài khoản trong game" });
      }
      if (login.status == 1) {
        return res
          .status(400)
          .json({ success: false, notification: "Tài khoản này đã bị khóa" });
      }
      return res
        .status(200)
        .json({ success: true, notification: "Đăng nhập thành công", data:{id:login._id, id_fb: login.fb_id, name: login.name } });
    } catch (error) {
      res.status(500).json({ error: 2, notification: "Lỗi server" });
    }
  };

module.exports = {LoginPayToFacebook}