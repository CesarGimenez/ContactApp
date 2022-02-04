const Orden = require("../Model/order");
const Detalleorden = require("../Model/orderdetails");
const producto = require("../Model/products");

function registrar(req, res) {
  let orden = new Orden();
  orden.contacto = req.body.contacto;
  orden.total = req.body.total;

  orden.save((err, orden_save) => {
    if (orden_save) {
      let detalles = req.body.detalles;
      detalles.forEach((element, index) => {
        let detalleorden = new Detalleorden();
        detalleorden.producto = element.producto;
        detalleorden.cantidad = element.cantidad;
        detalleorden.orden = orden_save._id;

        detalleorden.save((err, detalle_save) => {
          if (detalle_save) {
            producto.findById(
              { _id: element.producto },
              (err, producto_data) => {
                if (producto_data) {
                  // producto.findByIdAndUpdate(
                  //   { _id: producto_data._id },
                  //   {
                  //     stock:
                  //       parseInt(producto_data.stock) -
                  //       parseInt(element.cantidad),
                  //   },
                  //   (err, producto_edit) => {
                  //     res.end();
                  //   }
                  // );
                } else {
                  res.send("No se encontro el producto");
                }
              }
            );
          } else {
            res.send("No se pudo registrar los detalles de la orden");
          }
        });
      });
    } else {
      res.send("No se pudo registrar la orden");
    }
  });
}

function getOrden(req, res) {
  let id = req.params.id;
  Orden.findById(id)
    .populate("contacto")
    .exec((err, data_orden) => {
      if (data_orden) {
        Detalleorden.find({ orden: data_orden._id })
          .populate("producto")
          .exec({ orden: id }, (err, data_detalle) => {
            if (data_detalle) {
              res.send({
                data: {
                  venta: data_orden,
                  detalles: data_detalle,
                },
              });
            }
          });
      }
    });
}

function getOrders(req, res) {
  Orden.find()
    .populate("contacto")
    .exec((err, data_orders) => {
      if (data_orders) {
        res.send({ ordenes: data_orders });
      } else {
        res.send({ message: "No se encuentran ordenes realizadas" });
      }
    });
}

function detalles_orden(req, res) {
  let id = req.params.id;
  Detalleorden.find({ orden: id })
    .populate("producto")
    .exec((err, data_detalles) => {
      if (data_detalles) {
        res.send({ detalles: data_detalles });
      } else {
        res.send({ message: "No hay registros de detalles" });
      }
    });
}
function fechasVenta(req, res) {
  let fecha1 = req.body.fecha1;
  let fecha2 = req.body.fecha2;
  Venta.find({
    $and: [{ fecha: { $gte: fecha1 } }, { fecha: { $lte: fecha2 } }],
  })
    .populate("contacto")
    .exec((err, data) => {
      if (data) {
        res.send(data);
      } else {
        res.sed("No hay ordenes");
      }
    });
}

module.exports = {
  registrar,
  getOrden,
  getOrders,
  detalles_orden,
  fechasVenta,
};
