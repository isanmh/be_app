const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize("xe", "C##INIX", "inix", {
  host: process.env.DB_HOST || "localhost",
  dialect: process.env.DB_DIALECT || "oracle",
  dialectOptions: {
    connectString: "localhost:1521/xe",
  },
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Koneksi ke database berhasil");
  } catch (error) {
    console.error("Koneksi ke database gagal:", error);
  }
}
testConnection();

module.exports = sequelize;
