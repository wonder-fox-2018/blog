const router = require("express").Router();
const Controller = require("../controllers/articleControllers");
const isLogin = require("../middleware/isLogin");
const authDataArticle = require("../middleware/authDataArticle");

router.get("/", Controller.findAll);
router.get("/findOne/:id", Controller.findOne);
router.post("/", isLogin, Controller.create);
router.put("/:id", isLogin, authDataArticle, Controller.update);
router.delete("/remove/:id", isLogin, authDataArticle, Controller.remove);

module.exports = router;
