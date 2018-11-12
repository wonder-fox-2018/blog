const router = require("express").Router();
const Controller = require("../controllers/userControllers");

router.post("/register", Controller.signup);
router.post("/login", Controller.login);

module.exports = router;
