const router = require("express").Router();
const Controller = require("../controllers/articleControllers");
const isLogin = require("../middleware/isLogin");
const authDataArticle = require("../middleware/authDataArticle");

router.get("/", Controller.findAll);
router.get("/findOne/:id", Controller.findOne);
router.post("/", isLogin, Controller.create);
router.put("/:id", isLogin, authDataArticle, Controller.update);
router.get("/myarticle", isLogin, Controller.myarticle);
router.get("/articlePagginations", Controller.articlePagginations);
router.get("/search", Controller.searchByTitle);
router.get("/searchbycat", Controller.searchByCategory);
router.delete("/remove/:id", isLogin, authDataArticle, Controller.remove);

module.exports = router;
