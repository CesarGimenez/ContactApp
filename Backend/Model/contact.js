const mongoose = require("mongoose");
const { Schema } = mongoose;

const contactSchema = new Schema({
  nombre: { type: String, required: true },
  apellido: { type: String },
  email: { type: String, unique: true },
  telefono: { type: String },
  direccion: { type: String },
  active: { type: Boolean, default: true },
});

module.exports = mongoose.model("contactos", contactSchema);
