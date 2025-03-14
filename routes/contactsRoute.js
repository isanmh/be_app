const express = require("express");
const contactsController = require("../controllers/contactsController");
const contactValidator = require("../middleware/contactValidator");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.get("/test", contactsController.index);
router.get("/", contactsController.getAll);
router.post(
  "/",
  upload.single("image"),
  contactValidator,
  contactsController.store
);

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
