const sequelize = require("../database/dbConnection");

module.exports = {
  index: async (req, res) => {
    try {
      const [data] = await sequelize.query("SELECT * FROM company");
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  show: async (req, res) => {
    const { id } = req.params;
    try {
      const [data] = await sequelize.query(
        "SELECT * FROM company WHERE id = :id",
        {
          replacements: { id },
        }
      );
      if (data.length === 0) {
        return res.status(404).json({ message: "Company not found" });
      } else {
        res.json(data[0]);
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  store: async (req, res) => {
    const { name, address } = req.body;
    try {
      const [data] = await sequelize.query(
        "INSERT INTO company (name, address) VALUES (:name, :address)",
        {
          replacements: { name, address },
        }
      );
      res.status(201).json({ message: "Company created", data });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  update: async (req, res) => {
    const { id } = req.params;
    const { name, address } = req.body;
    try {
      const [data] = await sequelize.query(
        "UPDATE company SET name = :name, address = :address WHERE id = :id",
        {
          replacements: { name, address, id },
        }
      );
      //   logic 404
      if (data.rowsAffected === 0) {
        return res.status(404).json({ message: "Company not found" });
      } else {
        res.json({ message: "Company updated" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  delete: async (req, res) => {
    const { id } = req.params;
    try {
      const [data] = await sequelize.query(
        "DELETE FROM company WHERE id = :id",
        {
          replacements: { id },
        }
      );
      if (data.rowsAffected === 0) {
        return res.status(404).json({ message: "Company not found" });
      } else {
        res.json({ message: "Company deleted" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
