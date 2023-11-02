const PlayerModel = require("../model/Player");


const LoginFacebookPayment = async (tokenFB) => {
    const user = await PlayerModel.findOne({ fb_id: tokenFB });
    return user;
  };

module.exports = {LoginFacebookPayment}