const { json } = require("express");
const PaymentModel = require("../model/Payment.js");
const fs = require("fs");
const userSerivce = require("./Player.js");
const oderCode = "resources/orderCode.txt";

const orderCode = () => {

    return new Promise((resolve, reject) => {
        fs.readFile(oderCode, (err, data) => {
            console.log(data);
          if(err) return reject(err);
          let sequence = parseInt(data);
          if(isNaN(sequence)) {
            sequence = 0;
          }
          sequence++;
          fs.writeFile(oderCode, sequence.toString(), err => {
            if(err) return reject(err);
            resolve(sequence + 100);
          });
        });
      });
};
const countDotCoin = async (amount) => {
  console.log(amount);
  let dotCoint = amount * 0.005;
  if (amount >= 50000 && amount <= 100000) {
    dotCoint += 10;
  }

  if (amount > 100000) {
    dotCoint += 30;
  }
  if (amount > 200000) {
    dotCoint += 50;
  }
  if (amount > 500000) {
    dotCoint += 70;
  }
  if (amount > 1000000) {
    dotCoint += 100;
  }
  console.log(dotCoint);
  return dotCoint;
}
const paymentCreate = async (body, methodPayment) => {
  const data = JSON.parse(body);
  console.log(body);
  const buyerName = data.buyerName;
  const amountPayment = data.amount;
  const orderCode = data.orderCode;
  const idPlayer = data.buyerName;
  const description = data.description;
  let dotCoint = await countDotCoin(amountPayment);
  const payment = new PaymentModel({
    buyerName: buyerName,
    amountPayment: amountPayment,
    orderCodePayment: orderCode,
    methodPayment: methodPayment,
    dotCoint: dotCoint,
    statusPayment: "PENDING",
    idPlayer: idPlayer,
    description: description,
  });
  await payment.save();
  return payment;
};
const resPayment = async(orderCode,id, status)=>{
  const res = await PaymentModel.findOne({orderCodePayment: orderCode});
  res.statusPayment = status || status;
  res.transitionID = id || transitionID;
  await res.save();
  return res;
}
const paymentZaloPayCreate = async (order, id) => {
  const oderCode = await orderCode();
  const dotCoint = await countDotCoin(order.amount);
  const name = await userSerivce.getUser(id);
  const payment = await PaymentModel.create({
    buyerName: name.name,
    amountPayment: order.amount,
    orderCodePayment: oderCode,
    methodPayment: "ZaloPay",
    statusPayment: "PENDING",
    idPlayer: id,
    description: order.description,
    transitionID: order.app_trans_id,
    dotCoint: dotCoint,
  });
  await payment.save();
  return payment;
};
const paymentZaloPayRes = async (transitionID, status) => {
  const res = await PaymentModel.findOne({transitionID: transitionID});
  res.statusPayment = status;
  await res.save();
  return res;
}
const testPayement = async (transitionID) => {
  const res = await PaymentModel.findOne({transitionID: transitionID});
  return res;
}
module.exports = { paymentCreate, orderCode, countDotCoin, resPayment, paymentZaloPayCreate, paymentZaloPayRes,
  testPayement };
