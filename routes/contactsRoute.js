const express = require("express");
const contactsController = require("../controllers/contactsController");

const router = express.Router();

router.get("/test", contactsController.index);
router.get("/", contactsController.getAll);

module.exports = router;
