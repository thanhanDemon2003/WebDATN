const Order = require("../model/ZaloPay");

const saveOrder = async (orderData) => {
  const { description } = orderData.embeddata;

  const newOrder = {
    apptransid: orderData.apptransid,
    zptransid: orderData.zptransid,
    channel: orderData.channel,
    timestamp: orderData.servertime,
    amount: orderData.amount,
    description,
  };

  return Order.create(newOrder);
};
module.exports = { saveOrder };
