const mongoose = require("mongoose");

const URL = "mongodb://localhost/contactdb";
mongoose
  .connect(URL)
  .then((db) => console.log("db is connect"))
  .catch((err) => console.error(err));

module.exports = mongoose;
