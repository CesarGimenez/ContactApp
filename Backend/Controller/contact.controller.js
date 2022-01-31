const contact = require("../Model/contact");

const contactCtrl = {};

contactCtrl.getContacts = async (req, res) => {
  const contacts = await contact.find();
  res.json(contacts);
};

contactCtrl.createContact = async (req, res) => {
  const newContact = new contact({
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    email: req.body.email,
    telefono: req.body.telefono,
    direccion: req.body.direccion,
    active: req.body.active,
  });
  await newContact.save();
  res.json("registrado");
};

contactCtrl.getContact = async (req, res) => {
  const getcontact = await contact.findById(req.params.id);
  res.json(getcontact);
};
contactCtrl.editContact = async (req, res) => {
  const updateContact = {
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    email: req.body.email,
    telefono: req.body.telefono,
    direccion: req.body.direccion,
    active: req.body.active,
  };
  await contact.findByIdAndUpdate(
    req.params.id,
    { $set: updateContact },
    { new: true }
  );
  res.json("Actualizado");
};
contactCtrl.deleteContact = async (req, res) => {
  await contact.findByIdAndDelete(req.params.id);
  res.json("Eliminado");
};

module.exports = contactCtrl;
