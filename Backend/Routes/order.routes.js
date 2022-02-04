const express = require("express");
const router = express.Router();
const orden = require("../Controller/order.controller");

router.post("/", orden.registrar);
router.get("/:id", orden.getOrden);
router.get("/", orden.getOrders);
router.get("/detalles/:id", orden.detalles_orden);
router.post("/fechas", orden.fechasVenta);

module.exports = router;
