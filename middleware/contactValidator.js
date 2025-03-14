const { check } = require("express-validator");

module.exports = [
  check("name")
    .notEmpty()
    .withMessage("nama tidak boleh kosong")
    .isLength({ min: 3 })
    .withMessage("nama minimal 3 karakter"),
  check("email")
    .notEmpty()
    .withMessage("nama tidak boleh kosong")
    .isEmail()
    .withMessage("email tidak valid"),
  check("phone")
    .notEmpty()
    .withMessage("nama tidak boleh kosong")
    .isMobilePhone("id-ID")
    .withMessage("nomor telepon tidak valid"),
];
