const datauserModel = require("../model/DataUser.js");

const create = async (stt, token, method, name) => {
  const datauser = await datauserModel.create({ stt, token, method, name });
  return datauser;
};
const get = async (stt) => {

  let datauser = null;

  let startTime = Date.now();
  let count = 0;

  while (datauser === null) {
    console.log("Đang chờ tài khoản " + stt + " được tạo", count++);

    if (Date.now() - startTime > 300000) {
      break;
    }
    await new Promise(resolve => setTimeout(resolve, 10000)); 
    datauser = await datauserModel.findOne({stt});
  }

  return datauser;

}

module.exports = {
  create,
  get
}
