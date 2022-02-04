const products = require("../Model/products");

const productsCtrl = {};

productsCtrl.getProducts = async (req, res) => {
  const producto = await products.find();
  res.json(producto);
};

productsCtrl.createProduct = async (req, res) => {
  const newProduct = new products({
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    precio: req.body.precio,
    stock: req.body.stock,
  });
  await newProduct.save();
  res.send({ producto: newProduct });
};

productsCtrl.getProduct = async (req, res) => {
  const product = await products.findById(req.params.id);
  res.json(product);
};

productsCtrl.editProduct = async (req, res) => {
  const productUpdate = {
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    precio: req.body.precio,
    stock: req.body.stock,
  };
  await products.findByIdAndUpdate(
    req.params.id,
    { $set: productUpdate },
    { new: true }
  );
  res.json("Actualizado");
};
productsCtrl.deleteProduct = async (req, res) => {
  await products.findByIdAndDelete(req.params.id);
  res.json("Eliminado");
};

module.exports = productsCtrl;
