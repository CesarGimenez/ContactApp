const mongoose = require("mongoose");
const { Schema } = mongoose;

const detailSchema = new Schema({
  producto: { type: Schema.ObjectId, ref: "productos", required: true },
  cantidad: { type: Number },
  orden: { type: Schema.ObjectId, ref: "ordenes" },
});

module.exports = mongoose.model("detalleorden", detailSchema);
