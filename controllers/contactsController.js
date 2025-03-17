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

  async show(req, res) {
    const id = req.params.id;
    const contacts = await db.Contact.findOne({
      where: { id: id },
      attribut: ["id", "name", "email", "phone"],
    });
    if (!contacts) {
      return res.status(404).json({
        status: "Error",
        message: "Data not found",
      });
    }
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

  async update(req, res) {
    const errors = validationResult(req);
    const id = req.params.id;
    const { name, email, phone } = req.body;

    const contact = await db.Contact.findOne({ where: { id: id } });
    // jika data tidak ditemukan
    if (!contact) {
      // ini untuk menghapus file image yang sudah terupload jika data tidak ditemukan
      if (req.file) {
        const filepath = `./public/images/${req.file.filename}`;
        fs.unlinkSync(filepath);
      }
      return res.status(404).json({
        status: "Error",
        message: "Data not found",
      });
    }

    // jika ada error validation from express-validator
    if (!errors.isEmpty()) {
      return res.status(422).json({
        status: "Error",
        errors: errors.array(),
      });
    } else {
      // jika ada image dari form
      if (req.file) {
        if (contact.image !== null) {
          const filepath = `./public/images/${contact.image}`;
          fs.unlinkSync(filepath);
        }
        var image = req.file.filename;
      } else {
        var image = contact.image;
      }

      contact.name = name;
      contact.email = email;
      contact.phone = phone;
      contact.image = image;
      await contact.save();

      return res.status(200).json({
        status: "data berhasil diupdate",
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
