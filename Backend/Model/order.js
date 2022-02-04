const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
  contacto: { type: Schema.ObjectId, ref: "contactos", required: true },
  fecha: { type: Date, default: Date.now },
  total: { type: Number },
  pendiente: { type: Boolean, default: true },
});

module.exports = mongoose.model("ordenes", orderSchema);
