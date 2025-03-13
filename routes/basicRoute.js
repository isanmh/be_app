const express = require("express");
const basicController = require("../controllers/basicController");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Ohayooo! nice to meet you!");
});
router.get("/basic", basicController.index);
router.get("/home", basicController.home);

module.exports = router;
