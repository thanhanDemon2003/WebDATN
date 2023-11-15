const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const schema = new Schema({
  id: { type: ObjectId },
  transitionID: { type: String },
  buyerName: { type: String },
   amountPayment: { type: Number },
    orderCodePayment: { type: Number },
    methodPayment: { type: String },
    dotCoint: { type: Number },
    statusPayment: { type: String },
    idPlayer: { type: String },
    description: { type: String },
    Date: { type: Date, default: Date.now() },
});
schema.pre('save', function(next) {
  if (this.statusPayment === 'PENDING') {

    const now = Date.now();
    if (now - this.Date > 15*60*1000) {  
      this.statusPayment = 'CANCELLED';
    }
  }

  next();
});
module.exports = mongoose.models.payments || mongoose.model("payments", schema);
