const express = require("express");
const companyController = require("../controllers/companyController");
const router = express.Router();

router.get("/", companyController.index);
router.post("/", companyController.store);
router.get("/:id", companyController.show);
router.put("/:id", companyController.update);
router.delete("/:id", companyController.delete);

module.exports = router;
