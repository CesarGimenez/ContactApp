const express = require("express");
const app = express();
const { mongoose } = require("./database");
const cors = require("cors");

app.set("port", process.env.PORT || 3001);

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

app.use("/api/contacts", require("./Routes/contact.routes"));
app.use("/api/products", require("./Routes/product.routes"));
app.use("/api/orders", require("./Routes/order.routes"));

app.listen(app.get("port"), () => {
  console.log("Server on port", app.get("port"));
});
