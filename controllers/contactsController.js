const db = require("../database/models");
const { validationResult } = require("express-validator");

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
};
