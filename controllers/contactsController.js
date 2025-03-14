const db = require("../database/models");
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
};
