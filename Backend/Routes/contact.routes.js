const express = require("express");
const router = express.Router();
const contact = require("../Controller/contact.controller");

router.get("/", contact.getContacts);
router.post("/", contact.createContact);
router.get("/:id", contact.getContact);
router.put("/:id", contact.editContact);
router.delete("/:id", contact.deleteContact);

module.exports = router;
