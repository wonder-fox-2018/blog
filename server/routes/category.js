const router = require("express").Router();
const Controller = require("../controllers/categoryController");

router.post("/", Controller.create);
router.get("/", Controller.findAll);

module.exports = router;
