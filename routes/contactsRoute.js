const express = require("express");
const contactsController = require("../controllers/contactsController");
const contactValidator = require("../middleware/contactValidator");
const upload = require("../middleware/uploadMiddleware");
const { body } = require("express-validator");

const router = express.Router();

router.get("/test", contactsController.index);
router.get("/", contactsController.getAll);
router.get("/:id", contactsController.show);
router.post(
  "/",
  upload.single("image"),
  contactValidator,
  contactsController.store
);
router.put(
  "/:id",
  upload.single("image"),
  body("name").isLength({ min: 3 }).withMessage("nama minimal 3 karakter"),
  body("email").isEmail().withMessage("email tidak valid"),
  body("phone").isMobilePhone("id-ID").withMessage("nomor telepon tidak valid"),
  contactsController.update
);
router.delete("/:id", contactsController.destroy);

// cek image upload
router.post("/upload", upload.single("image"), (req, res) => {
  try {
    res.json({
      status: "Success",
      message: "File berhasil diupload",
      data: {
        name: req.file.filename,
        mimetype: req.file.mimetype,
        size: req.file.size,
        originalname: req.file.originalname,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: "File gagal diupload",
      data: {
        error: error.message,
      },
    });
  }
});

module.exports = router;
