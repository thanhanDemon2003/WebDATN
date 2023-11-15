const mongoose = require('mongoose');

const zaloPaySchema = new mongoose.Schema({
  appid: Number,
  apptransid: String,
  apptime: Number,
  appuser: String,
  amount: Number,
  embeddata: String,
  item: [
    {
      itemid: String,
      itename: String, 
      itemprice: Number,
      itemquantity: Number  
    }
  ],
  zptransid: Number,
  servertime: Number,
  channel: Number,
  merchantuserid: String,
  userfeeamount: Number,
  discountamount: Number,
  mac: String
});

const ZaloPay = mongoose.model('ZaloPay', zaloPaySchema);

module.exports = ZaloPay;