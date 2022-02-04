const mongoose = require("mongoose");
const { Schema } = mongoose;

const productosSchema = new Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String },
  precio: { type: Number },
  stock: { type: Number },
});

module.exports = mongoose.model("productos", productosSchema);
