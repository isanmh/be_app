const db = require("../database/models");
const { validationResult } = require("express-validator");
const fs = require("fs");

module.exports = {
  index: (req, res) => {
    res.send("test");
  },

  async getAll(req, res) {
    const contacts = await db.Contact.findAll({
      attribut: ["id", "name", "email", "phone"],
    });
    return res.status(200).json({
      status: "Success",
      data: contacts,
    });
  },

  async store(req, res) {
    console.log(req.file);
    const { name, email, phone } = req.body;
    const errors = validationResult(req);
    // check file
    if (req.file) {
      var image = req.file.filename;
    } else {
      var image = null;
    }

    // jika ada error
    if (!errors.isEmpty()) {
      return res.status(422).json({
        status: "Error",
        errors: errors.array(),
      });
    } else {
      const contact = await db.Contact.create({
        name: name,
        email: email,
        phone: phone,
        image: image,
      });
      return res.status(201).json({
        status: "data berhasil ditambahkan",
        data: contact,
      });
    }
  },
  async destroy(req, res) {
    const id = req.params.id;
    const contact = await db.Contact.findOne({ where: { id: id } });
    if (contact) {
      // jika image ada
      if (contact.image !== null) {
        const filepath = `./public/images/${contact.image}`;
        fs.unlinkSync(filepath);
      }
      await contact.destroy();
      return res.status(200).json({ status: "data berhasil dihapus" });
    } else {
      return res.status(404).json({ status: "data tidak ditemukan" });
    }
  },
};
