const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  stt: { type: String, required: true },
  token: { type: String, required: true },
  method: { type: String, required: true },
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 900 },  
});

module.exports = mongoose.models.datauser || mongoose.model("datauser", schema);
